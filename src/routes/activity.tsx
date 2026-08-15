import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Eye, Heart, History, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/shop/SiteHeader";
import { ProductImage } from "@/components/shop/ProductImage";
import { EmptyState, ErrorState, RowSkeleton } from "@/components/shop/states";
import { brandName, CURRENT_USER_ID } from "@/data/mockData";
import { formatDate, formatPrice } from "@/lib/format";
import { getUserActivity, type ActivityEntry } from "@/services/userService";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "My activity — ShopGraph" },
      {
        name: "description",
        content:
          "A clean timeline of everything you purchased, viewed and liked — the signals behind your recommendations.",
      },
      { property: "og:title", content: "My activity — ShopGraph" },
      {
        property: "og:description",
        content: "Recently purchased, recently viewed and liked products in one timeline.",
      },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["activity", CURRENT_USER_ID],
    queryFn: () => getUserActivity(CURRENT_USER_ID),
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <header className="max-w-2xl">
          <span className="eyebrow">Your signals</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">My activity</h1>
          <p className="mt-4 text-muted-foreground">
            These actions are the nodes and lines ShopGraph follows when it recommends something.
          </p>
        </header>

        {isLoading ? (
          <div className="mt-12 space-y-10">
            <RowSkeleton />
            <RowSkeleton count={3} />
          </div>
        ) : isError ? (
          <div className="mt-12">
            <ErrorState onRetry={() => refetch()} />
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            <Timeline
              title="Recently Purchased"
              relation="PURCHASED"
              icon={ShoppingBag}
              entries={data?.purchased ?? []}
            />
            <Timeline
              title="Recently Viewed"
              relation="VIEWED"
              icon={Eye}
              entries={data?.viewed ?? []}
            />
            <Timeline
              title="Liked Products"
              relation="LIKED"
              icon={Heart}
              entries={data?.liked ?? []}
            />
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function Timeline({
  title,
  relation,
  icon: Icon,
  entries,
}: {
  title: string;
  relation: string;
  icon: LucideIcon;
  entries: ActivityEntry[];
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-accent" aria-hidden />
        <h2 className="font-sans text-lg font-semibold tracking-normal">{title}</h2>
        <span className="eyebrow ml-1">{entries.length}</span>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          className="mt-5 py-12"
          icon={<History className="h-5 w-5" aria-hidden />}
          title="Nothing here yet"
          description="As soon as you browse or save products, this timeline fills up."
          action={
            <Link
              to="/explore"
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Explore products
            </Link>
          }
        />
      ) : (
        <ol className="mt-5 space-y-3 border-l border-border pl-5">
          {entries.map((entry) => (
            <li key={`${relation}-${entry.product.id}`} className="relative">
              <span className="absolute -left-[25px] top-8 h-2 w-2 rounded-full bg-accent" />
              <Link
                to="/products/$productId"
                params={{ productId: entry.product.id }}
                className="card-surface flex items-center gap-4 p-4 transition-shadow hover:shadow-lift"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-surface">
                  <ProductImage src={entry.product.image} alt={entry.product.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{entry.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {brandName(entry.product.brandId)} · {formatPrice(entry.product.price)}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <span className="eyebrow">{relation}</span>
                  <p className="text-sm text-muted-foreground">{formatDate(entry.at)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
