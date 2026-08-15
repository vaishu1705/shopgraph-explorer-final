import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/shop/SiteHeader";
import { RecommendationCard } from "@/components/shop/RecommendationCard";
import { WhyPanel } from "@/components/shop/WhyPanel";
import { EmptyState, ErrorState, ProductGridSkeleton } from "@/components/shop/states";
import { CURRENT_USER_ID } from "@/data/mockData";
import type { Recommendation } from "@/data/types";
import { getRecommendations } from "@/services/recommendationService";
import { getUserStats } from "@/services/userService";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Welcome back — ShopGraph" },
      {
        name: "description",
        content:
          "Your personal ShopGraph space: what you've bought, viewed and liked, plus products picked for you.",
      },
      { property: "og:title", content: "Welcome back — ShopGraph" },
      {
        property: "og:description",
        content: "A personal shopping space with recommendations that explain themselves.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [active, setActive] = useState<Recommendation | null>(null);

  const stats = useQuery({
    queryKey: ["stats", CURRENT_USER_ID],
    queryFn: () => getUserStats(CURRENT_USER_ID),
  });
  const recs = useQuery({
    queryKey: ["recommendations", CURRENT_USER_ID],
    queryFn: () => getRecommendations(CURRENT_USER_ID),
  });

  const items = (recs.data ?? []).filter((r) => r.bucket === "picked").slice(0, 4);

  const tiles = [
    { label: "Purchased", value: stats.data?.purchased ?? 8 },
    { label: "Viewed", value: stats.data?.viewed ?? 15 },
    { label: "Liked", value: stats.data?.liked ?? 6 },
    { label: "Recommendations", value: stats.data?.recommendations ?? 12 },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Your space</span>
            <h1 className="mt-3 text-4xl sm:text-5xl">Welcome back, Vaishnavi</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Here is what your activity is connected to right now.
            </p>
          </div>
          <Link
            to="/graph"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            See your graph <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="card-surface p-6">
              <p className="font-display text-4xl">{tile.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl">Picked for you</h2>
            <Link
              to="/recommendations"
              className="text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4"
            >
              View all
            </Link>
          </div>

          <div className="mt-6">
            {recs.isLoading ? (
              <ProductGridSkeleton count={4} />
            ) : recs.isError ? (
              <ErrorState onRetry={() => recs.refetch()} />
            ) : items.length === 0 ? (
              <EmptyState
                icon={<Sparkles className="h-5 w-5" aria-hidden />}
                title="No recommendations yet"
                description="Save a few products you like and this section fills up straight away."
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((rec) => (
                  <RecommendationCard key={rec.productId} recommendation={rec} onWhy={setActive} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <WhyPanel recommendation={active} onClose={() => setActive(null)} />
      <SiteFooter />
    </div>
  );
}
