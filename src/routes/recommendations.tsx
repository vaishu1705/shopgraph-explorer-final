import { useState } from "react";

import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  ArrowRight,
  BrainCircuit,
  Network,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import {
  RecommendationCard,
} from "@/components/shop/RecommendationCard";

import {
  WhyPanel,
} from "@/components/shop/WhyPanel";

import {
  EmptyState,
  ErrorState,
  ProductGridSkeleton,
} from "@/components/shop/states";

import {
  CURRENT_USER_ID,
} from "@/data/mockData";

import type {
  Recommendation,
} from "@/data/types";

import {
  getRecommendations,
} from "@/services/recommendationService";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute(
  "/recommendations",
)({

  head: () => ({

    meta: [

      {
        title:
          "Your Recommendations — ShopGraph",
      },

      {
        name: "description",
        content:
          "Discover explainable product recommendations based on your shopping connections.",
      },

      {
        property: "og:title",
        content:
          "Your Recommendations — ShopGraph",
      },

      {
        property: "og:description",
        content:
          "Product recommendations explained through meaningful relationships.",
      },

    ],

  }),

  component:
    RecommendationsPage,

});


/* =========================================================
   RECOMMENDATION SECTIONS
========================================================= */

const sections = [

  {
    bucket: "picked",
    title: "Picked for you",
    subtitle:
      "Recommendations selected from your shopping interests.",
    icon: Sparkles,
  },

  {
    bucket: "because",
    title: "Because you bought this",
    subtitle:
      "Products connected to something you've purchased.",
    icon: Network,
  },

  {
    bucket: "setup",
    title: "Complete your setup",
    subtitle:
      "Products that naturally work together.",
    icon: WandSparkles,
  },

  {
    bucket: "similar",
    title: "Similar to what you like",
    subtitle:
      "Explore products related to your interests.",
    icon: BrainCircuit,
  },

] as const;


/* =========================================================
   PAGE
========================================================= */

function RecommendationsPage() {

  const [
    active,
    setActive,
  ] =
    useState<Recommendation | null>(
      null,
    );


  /* =======================================================
     API
  ======================================================= */

  const {
    data,
    isLoading,
    isError,
    refetch,
  } =
    useQuery({

      queryKey: [
        "recommendations",
        CURRENT_USER_ID,
      ],

      queryFn: () =>
        getRecommendations(
          CURRENT_USER_ID,
        ),

    });


  return (

    <div className="min-h-screen bg-slate-50">


      {/* ===================================================
          HEADER
      =================================================== */}

      <SiteHeader />


      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-10 text-white shadow-xl sm:px-10 sm:py-14 lg:px-14">


          {/* DECORATIVE ELEMENTS */}

          <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />


          {/* GRID */}

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">


            {/* TEXT */}

            <div className="max-w-3xl">


              {/* EYEBROW */}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">

                <Sparkles className="h-3.5 w-3.5" />

                Explainable shopping

              </div>


              {/* TITLE */}

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">

                Your recommendations
                <span className="text-indigo-400">
                  .
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">

                Discover products that make sense for
                you — and see the relationship behind
                every recommendation.

              </p>


              {/* EXPLANATION */}

              <div className="mt-7 flex flex-wrap gap-3">

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">

                  Your activity

                </span>

                <ArrowRight className="mt-1 h-4 w-4 text-slate-500" />

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">

                  Product relationships

                </span>

                <ArrowRight className="mt-1 h-4 w-4 text-slate-500" />

                <span className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">

                  Recommendations

                </span>

              </div>

            </div>


            {/* HERO VISUAL */}

            <div className="hidden lg:block">

              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/5">

                <div className="absolute h-32 w-32 rounded-full border border-indigo-400/30" />

                <div className="absolute h-20 w-20 rounded-full border border-cyan-400/30" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-950/50">

                  <Network className="h-7 w-7 text-white" />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            INTRO CARD
        ================================================= */}

        {!isLoading &&
          !isError &&
          data &&
          data.length > 0 && (

            <section className="mt-8 rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                    <BrainCircuit className="h-5 w-5" />

                  </div>


                  <div>

                    <h2 className="font-semibold text-slate-950">

                      Recommendations with a reason

                    </h2>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">

                      ShopGraph doesn't simply rank products.
                      Each recommendation is connected to your
                      activity or another product relationship.

                    </p>

                  </div>

                </div>


                <div className="shrink-0 rounded-2xl bg-indigo-50 px-5 py-3">

                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">

                    Available

                  </p>

                  <p className="mt-0.5 text-xl font-bold text-indigo-700">

                    {data.length}

                  </p>

                </div>

              </div>

            </section>

          )}


        {/* =================================================
            LOADING
        ================================================= */}

        {isLoading && (

          <section className="mt-12">

            <div className="mb-6">

              <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />

              <div className="mt-3 h-8 w-64 animate-pulse rounded-xl bg-slate-200" />

            </div>

            <ProductGridSkeleton />

          </section>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {isError && !isLoading && (

          <section className="mt-12 rounded-3xl border border-red-100 bg-white p-10 shadow-sm">

            <ErrorState
              onRetry={() =>
                refetch()
              }
            />

          </section>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!isLoading &&
          !isError &&
          (!data ||
            data.length === 0) && (

            <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

              <EmptyState
                icon={
                  <Sparkles className="h-5 w-5" />
                }
                title="No recommendations yet"
                description="Browse a few products and save what you like. Recommendations will appear as soon as ShopGraph has connections to follow."
              />

            </section>

          )}


        {/* =================================================
            RECOMMENDATION SECTIONS
        ================================================= */}

        {!isLoading &&
          !isError &&
          data &&
          data.length > 0 && (

            <div className="mt-14 space-y-16">

              {sections.map(
                (section) => {

                  const items =
                    data
                      .filter(
                        (
                          recommendation,
                        ) =>
                          recommendation.bucket ===
                          section.bucket,
                      )
                      .slice(0, 4);


                  if (
                    items.length ===
                    0
                  ) {
                    return null;
                  }


                  const Icon =
                    section.icon;


                  return (

                    <section
                      key={
                        section.bucket
                      }
                    >


                      {/* SECTION HEADER */}

                      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                          <div className="flex items-center gap-2">

                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                              <Icon className="h-4 w-4" />

                            </span>


                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">

                              Connected recommendations

                            </span>

                          </div>


                          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

                            {section.title}

                          </h2>


                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">

                            {section.subtitle}

                          </p>

                        </div>


                        <span className="w-fit rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-500">

                          {items.length}{" "}
                          {items.length ===
                          1
                            ? "product"
                            : "products"}

                        </span>

                      </div>


                      {/* CARDS */}

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {items.map(
                          (
                            recommendation,
                          ) => (

                            <RecommendationCard
                              key={`${section.bucket}-${recommendation.productId}`}
                              recommendation={
                                recommendation
                              }
                              onWhy={
                                setActive
                              }
                            />

                          ),
                        )}

                      </div>

                    </section>

                  );

                },
              )}

            </div>

          )}


        {/* =================================================
            BOTTOM EXPLANATION
        ================================================= */}

        {!isLoading &&
          !isError &&
          data &&
          data.length > 0 && (

            <section className="relative mt-20 overflow-hidden rounded-[2rem] bg-indigo-50 px-7 py-9 sm:px-10">

              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">


                <div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 shadow-sm">

                    <Sparkles className="h-3.5 w-3.5" />

                    How ShopGraph works

                  </div>


                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

                    Recommendations you can understand

                  </h2>


                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">

                    Your recommendations are built around
                    relationships between you, products,
                    brands and categories. Select{" "}
                    <strong>
                      Why?
                    </strong>{" "}
                    on any recommendation to see the
                    connection behind it.

                  </p>

                </div>


                <div className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-sm">

                  <Step
                    number="01"
                    text="Activity"
                  />

                  <ArrowRight className="h-4 w-4 text-slate-300" />

                  <Step
                    number="02"
                    text="Connection"
                  />

                  <ArrowRight className="h-4 w-4 text-slate-300" />

                  <Step
                    number="03"
                    text="Discovery"
                  />

                </div>

              </div>

            </section>

          )}

      </main>


      {/* ===================================================
          WHY PANEL
      =================================================== */}

      <WhyPanel
        recommendation={
          active
        }
        onClose={() =>
          setActive(null)
        }
      />


      {/* ===================================================
          FOOTER
      =================================================== */}

      <SiteFooter />

    </div>

  );
}


/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  text,
}: {
  number: string;

  text: string;
}) {

  return (

    <div className="flex min-w-[68px] flex-col items-center rounded-xl bg-slate-50 px-3 py-2.5">

      <span className="text-[10px] font-bold tracking-wider text-indigo-500">

        {number}

      </span>

      <span className="mt-0.5 text-xs font-bold text-slate-700">

        {text}

      </span>

    </div>

  );
}