import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  ArrowRight,
  Eye,
  Heart,
  Network,
  Package,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import { ErrorState } from "@/components/shop/states";

import { ProductCard } from "@/components/shop/ProductCard";

import {
  brandName,
  categoryName,
  CURRENT_USER_ID,
} from "@/data/mockData";

import type { Product } from "@/data/types";

import {
  getUser,
  getUserActivity,
  getUserStats,
} from "@/services/userService";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute(
  "/profile",
)({

  head: () => ({

    meta: [

      {
        title: "Your Profile — ShopGraph",
      },

      {
        name: "description",
        content:
          "Your ShopGraph profile, shopping activity, favourite categories, brands and interests.",
      },

      {
        property: "og:title",
        content: "Your Profile — ShopGraph",
      },

      {
        property: "og:description",
        content:
          "View your shopping activity, interests and product connections.",
      },

    ],

  }),

  component: ProfilePage,

});


/* =========================================================
   PROFILE PAGE
========================================================= */

function ProfilePage() {

  /* =======================================================
     USER
  ======================================================= */

  const userQuery =
    useQuery({

      queryKey: [
        "user",
        CURRENT_USER_ID,
      ],

      queryFn: () =>
        getUser(
          CURRENT_USER_ID,
        ),

    });


  /* =======================================================
     ACTIVITY
  ======================================================= */

  const activityQuery =
    useQuery({

      queryKey: [
        "user-activity",
        CURRENT_USER_ID,
      ],

      queryFn: () =>
        getUserActivity(
          CURRENT_USER_ID,
        ),

    });


  /* =======================================================
     STATS
  ======================================================= */

  const statsQuery =
    useQuery({

      queryKey: [
        "user-stats",
        CURRENT_USER_ID,
      ],

      queryFn: () =>
        getUserStats(
          CURRENT_USER_ID,
        ),

    });


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    userQuery.isLoading ||
    activityQuery.isLoading ||
    statsQuery.isLoading
  ) {

    return (

      <div className="min-h-screen bg-slate-50">

        <SiteHeader />

        <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

          <ProfileSkeleton />

        </main>

        <SiteFooter />

      </div>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    userQuery.isError ||
    !userQuery.data
  ) {

    return (

      <div className="min-h-screen bg-slate-50">

        <SiteHeader />

        <main className="mx-auto max-w-4xl px-5 py-20 lg:px-8">

          <ErrorState
            onRetry={() =>
              userQuery.refetch()
            }
          />

        </main>

        <SiteFooter />

      </div>

    );

  }


  const user =
    userQuery.data;

  const activity =
    activityQuery.data;

  const stats =
    statsQuery.data;


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <div className="min-h-screen bg-slate-50">

      <SiteHeader />


      <main className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">


        {/* =================================================
            PROFILE HERO
        ================================================= */}

        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-9 text-white shadow-xl sm:px-10 sm:py-12 lg:px-14">


          {/* Decorative background */}

          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />


          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">


            {/* USER */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">


              {/* AVATAR */}

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] bg-indigo-600 text-3xl font-bold shadow-xl shadow-indigo-950/50">

                {user.avatarInitials}

              </div>


              {/* INFORMATION */}

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-200">

                  <Sparkles className="h-3 w-3" />

                  Your ShopGraph

                </div>


                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">

                  {user.name}

                </h1>


                <p className="mt-1 text-sm text-slate-400 sm:text-base">

                  {user.email}

                </p>

              </div>

            </div>


            {/* GRAPH LINK */}

            <Link
              to="/graph"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-50"
            >

              <Network className="h-4 w-4" />

              Explore my graph

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>


          {/* HERO DESCRIPTION */}

          <div className="relative mt-8 max-w-2xl border-t border-white/10 pt-6">

            <p className="text-sm leading-6 text-slate-300">

              Your profile brings together the products
              you purchased, viewed and liked — helping
              ShopGraph understand your interests and
              create more explainable recommendations.

            </p>

          </div>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


          <StatCard
            icon={
              <ShoppingBag className="h-5 w-5" />
            }
            label="Purchased"
            value={
              stats?.purchased ?? 0
            }
          />


          <StatCard
            icon={
              <Eye className="h-5 w-5" />
            }
            label="Viewed"
            value={
              stats?.viewed ?? 0
            }
          />


          <StatCard
            icon={
              <Heart className="h-5 w-5" />
            }
            label="Liked"
            value={
              stats?.liked ?? 0
            }
          />


          <StatCard
            icon={
              <Sparkles className="h-5 w-5" />
            }
            label="Recommendations"
            value={
              stats?.recommendations ??
              0
            }
          />

        </section>


        {/* =================================================
            FAVOURITES
        ================================================= */}

        <section className="mt-10 grid gap-6 lg:grid-cols-2">


          <Panel
            icon={
              <Package className="h-5 w-5" />
            }
            title="Favourite Categories"
            description="Categories that reflect your shopping preferences."
          >

            {user.favoriteCategories.length >
            0 ? (

              <Tags
                items={user.favoriteCategories.map(
                  categoryName,
                )}
              />

            ) : (

              <EmptyText text="No favourite categories yet." />

            )}

          </Panel>


          <Panel
            icon={
              <Sparkles className="h-5 w-5" />
            }
            title="Favourite Brands"
            description="Brands that appear most often in your interests."
          >

            {user.favoriteBrands.length >
            0 ? (

              <Tags
                items={user.favoriteBrands.map(
                  brandName,
                )}
              />

            ) : (

              <EmptyText text="No favourite brands yet." />

            )}

          </Panel>

        </section>


        {/* =================================================
            SHOPPING INTERESTS
        ================================================= */}

        <section className="mt-6">

          <Panel
            icon={
              <Network className="h-5 w-5" />
            }
            title="Shopping Interests"
            description="The interests that help shape your ShopGraph recommendations."
          >

            {user.interests.length >
            0 ? (

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {user.interests.map(
                  (interest) => (

                    <div
                      key={interest}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
                    >

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                        <Sparkles className="h-3.5 w-3.5" />

                      </span>

                      <span className="text-sm font-medium text-slate-700">

                        {interest}

                      </span>

                    </div>

                  ),
                )}

              </div>

            ) : (

              <EmptyText
                text="No shopping interests available yet."
              />

            )}

          </Panel>

        </section>


        {/* =================================================
            PURCHASE HISTORY
        ================================================= */}

        <ActivitySection
          title="Purchase History"
          subtitle="Products you purchased"
          products={
            activity?.purchased.map(
              (entry) =>
                entry.product,
            ) ?? []
          }
          emptyText="You haven't purchased any products yet."
          icon={
            <ShoppingBag className="h-5 w-5" />
          }
        />


        {/* =================================================
            RECENTLY VIEWED
        ================================================= */}

        <ActivitySection
          title="Recently Viewed"
          subtitle="Products you recently explored"
          products={
            activity?.viewed.map(
              (entry) =>
                entry.product,
            ) ?? []
          }
          emptyText="You haven't viewed any products yet."
          icon={
            <Eye className="h-5 w-5" />
          }
        />


        {/* =================================================
            LIKED PRODUCTS
        ================================================= */}

        <ActivitySection
          title="Liked Products"
          subtitle="Products you showed interest in"
          products={
            activity?.liked.map(
              (entry) =>
                entry.product,
            ) ?? []
          }
          emptyText="You haven't liked any products yet."
          icon={
            <Heart className="h-5 w-5" />
          }
        />


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="mt-16 overflow-hidden rounded-[2rem] bg-indigo-50 px-7 py-9 sm:px-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">

                <Network className="h-5 w-5" />

              </div>


              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

                See how your shopping connects

              </h2>


              <p className="mt-3 text-sm leading-6 text-slate-600">

                Explore the relationships between your
                activity, products, brands and categories
                in the interactive ShopGraph.

              </p>

            </div>


            <Link
              to="/graph"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >

              Open Graph Explorer

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

        </section>

      </main>


      <SiteFooter />

    </div>

  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {

  return (

    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">


      <div className="flex items-center justify-between">

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">

          {icon}

        </span>

      </div>


      <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">

        {value}

      </p>


      <p className="mt-1 text-sm font-medium text-slate-500">

        {label}

      </p>

    </div>

  );
}


/* =========================================================
   ACTIVITY SECTION
========================================================= */

function ActivitySection({
  title,
  subtitle,
  products,
  emptyText,
  icon,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  emptyText: string;
  icon: React.ReactNode;
}) {

  return (

    <section className="mt-14">


      {/* HEADER */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="flex items-center gap-2.5">

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              {icon}

            </span>


            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

              {title}

            </h2>

          </div>


          <p className="mt-2 text-sm text-slate-500">

            {subtitle}

          </p>

        </div>


        {products.length >
          0 && (

          <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-500">

            {products.length}{" "}
            {products.length ===
            1
              ? "product"
              : "products"}

          </span>

        )}

      </div>


      {/* PRODUCTS */}

      {products.length ===
      0 ? (

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

          <div className="flex flex-col items-center justify-center text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">

              {icon}

            </div>


            <p className="mt-4 max-w-md text-sm text-slate-500">

              {emptyText}

            </p>

          </div>

        </div>

      ) : (

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {products
            .slice(0, 6)
            .map(
              (product) => (

                <div
                  key={
                    product.id
                  }
                  className="group"
                >

                  <ProductCard
                    product={
                      product
                    }
                  />


                  <Link
                    to="/products/$productId"
                    params={{
                      productId:
                        product.id,
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
                  >

                    View product

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                  </Link>

                </div>

              ),
            )}

        </div>

      )}

    </section>

  );
}


/* =========================================================
   PANEL
========================================================= */

function Panel({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {

  return (

    <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">


      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          {icon}

        </div>


        <div>

          <h2 className="font-semibold text-slate-950">

            {title}

          </h2>


          <p className="mt-1 text-xs leading-5 text-slate-500">

            {description}

          </p>

        </div>

      </div>


      <div className="mt-6">

        {children}

      </div>

    </section>

  );
}


/* =========================================================
   TAGS
========================================================= */

function Tags({
  items,
}: {
  items: string[];
}) {

  return (

    <div className="flex flex-wrap gap-2">

      {items.map(
        (item) => (

          <span
            key={item}
            className="rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-sm font-medium text-indigo-700"
          >

            {item}

          </span>

        ),
      )}

    </div>

  );
}


/* =========================================================
   EMPTY TEXT
========================================================= */

function EmptyText({
  text,
}: {
  text: string;
}) {

  return (

    <div className="rounded-2xl bg-slate-50 p-4">

      <p className="text-sm text-slate-500">

        {text}

      </p>

    </div>

  );
}


/* =========================================================
   PROFILE SKELETON
========================================================= */

function ProfileSkeleton() {

  return (

    <div className="space-y-8">


      {/* HERO */}

      <div className="h-64 animate-pulse rounded-[2rem] bg-slate-900" />


      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {[1, 2, 3, 4].map(
          (item) => (

            <div
              key={item}
              className="h-36 animate-pulse rounded-3xl bg-white"
            />

          ),
        )}

      </div>


      {/* PANELS */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="h-48 animate-pulse rounded-3xl bg-white" />

        <div className="h-48 animate-pulse rounded-3xl bg-white" />

      </div>


      {/* INTERESTS */}

      <div className="h-48 animate-pulse rounded-3xl bg-white" />


      {/* PRODUCTS */}

      {[1, 2, 3].map(
        (section) => (

          <div
            key={section}
            className="space-y-5"
          >

            <div className="h-8 w-56 animate-pulse rounded-xl bg-slate-200" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map(
                (item) => (

                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-3xl bg-white"
                  />

                ),
              )}

            </div>

          </div>

        ),
      )}

    </div>

  );
}