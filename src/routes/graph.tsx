import {
  lazy,
  Suspense,
  useState,
} from "react";

import {
  createFileRoute,
  ClientOnly,
} from "@tanstack/react-router";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  ArrowRight,
  GitBranch,
  Network,
  Sparkles,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import {
  GraphLegend,
} from "@/components/shop/GraphLegend";

import {
  EmptyState,
  ErrorState,
} from "@/components/shop/states";

import {
  CURRENT_USER_ID,
} from "@/data/mockData";

import {
  formatPrice,
} from "@/lib/format";

import {
  getGraph,
} from "@/services/graphService";


/* =========================================================
   GRAPH CANVAS
========================================================= */

const GraphCanvas = lazy(
  () =>
    import(
      "@/components/graph/GraphCanvas"
    ),
);


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute(
  "/graph",
)({

  head: () => ({

    meta: [

      {
        title:
          "Explore the ShopGraph — ShopGraph",
      },

      {
        name: "description",
        content:
          "Explore the relationships between products, people, brands and categories.",
      },

      {
        property: "og:title",
        content:
          "Explore the ShopGraph",
      },

      {
        property: "og:description",
        content:
          "See how products, people, brands and categories connect.",
      },

    ],

  }),

  component:
    GraphPage,

});


/* =========================================================
   PAGE
========================================================= */

function GraphPage() {

  const [
    selectedId,
    setSelectedId,
  ] =
    useState<string | null>(
      null,
    );


  /* =======================================================
     GRAPH QUERY
  ======================================================= */

  const {
    data,
    isLoading,
    isError,
    refetch,
  } =
    useQuery({

      queryKey: [
        "graph",
        CURRENT_USER_ID,
      ],

      queryFn: () =>
        getGraph(
          CURRENT_USER_ID,
        ),

    });


  /* =======================================================
     SELECTED NODE
  ======================================================= */

  const selected =
    data?.nodes.find(
      (node) =>
        node.id ===
        selectedId,
    );


  /* =======================================================
     CONNECTIONS
  ======================================================= */

  const connections =
    data?.edges

      .filter(
        (edge) =>
          edge.source ===
            selectedId ||
          edge.target ===
            selectedId,
      )

      .map(
        (edge) => {

          const otherId =
            edge.source ===
            selectedId
              ? edge.target
              : edge.source;

          return {

            relation:
              edge.label,

            label:
              data.nodes.find(
                (node) =>
                  node.id ===
                  otherId,
              )?.label ?? "",

          };

        },
      );


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


          {/* DECORATIVE BACKGROUND */}

          <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />


          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">


            {/* TEXT */}

            <div className="max-w-3xl">


              {/* EYEBROW */}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">

                <Network className="h-3.5 w-3.5" />

                Connected shopping

              </div>


              {/* TITLE */}

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">

                Explore the ShopGraph
                <span className="text-indigo-400">
                  .
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">

                Explore how you, products, brands and
                categories connect through meaningful
                shopping relationships.

              </p>


              {/* EXPLANATION */}

              <div className="mt-7 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">

                  People

                </span>

                <ArrowRight className="h-4 w-4 text-slate-500" />

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">

                  Products

                </span>

                <ArrowRight className="h-4 w-4 text-slate-500" />

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">

                  Brands

                </span>

                <ArrowRight className="h-4 w-4 text-slate-500" />

                <span className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">

                  Categories

                </span>

              </div>

            </div>


            {/* GRAPH VISUAL */}

            <div className="hidden lg:flex">

              <div className="relative flex h-52 w-52 items-center justify-center">


                {/* OUTER RING */}

                <div className="absolute h-52 w-52 animate-[spin_18s_linear_infinite] rounded-full border border-white/10" />


                {/* MIDDLE RING */}

                <div className="absolute h-36 w-36 rounded-full border border-indigo-400/30" />


                {/* INNER */}

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 shadow-2xl shadow-indigo-950/60">

                  <GitBranch className="h-9 w-9 text-white" />

                </div>


                {/* DOTS */}

                <span className="absolute left-5 top-16 h-3 w-3 rounded-full bg-cyan-400" />

                <span className="absolute right-6 top-10 h-2.5 w-2.5 rounded-full bg-indigo-400" />

                <span className="absolute bottom-9 right-16 h-3 w-3 rounded-full bg-white" />

                <span className="absolute bottom-12 left-16 h-2 w-2 rounded-full bg-cyan-300" />

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            EXPLANATION CARD
        ================================================= */}

        <section className="mt-8 rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              <Sparkles className="h-5 w-5" />

            </div>


            <div>

              <h2 className="font-semibold text-slate-950">

                How to read the graph

              </h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">

                Nodes represent things such as users,
                products, brands and categories. Lines
                represent the relationships between them.
                Select a node to inspect its connections.

              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            LEGEND
        ================================================= */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-4 flex items-center gap-2">

            <Network className="h-4 w-4 text-indigo-600" />

            <h2 className="text-sm font-bold text-slate-900">

              Graph legend

            </h2>

          </div>


          <GraphLegend />

        </section>


        {/* =================================================
            GRAPH AREA
        ================================================= */}

        <section className="mt-6">


          {/* LOADING */}

          {isLoading && (

            <div className="h-[560px] w-full animate-pulse rounded-[2rem] border border-slate-200 bg-white shadow-sm" />

          )}


          {/* ERROR */}

          {isError &&
            !isLoading && (

              <div className="flex min-h-[560px] items-center justify-center rounded-[2rem] border border-red-100 bg-white p-10 shadow-sm">

                <ErrorState
                  onRetry={() =>
                    refetch()
                  }
                />

              </div>

            )}


          {/* EMPTY */}

          {!isLoading &&
            !isError &&
            (!data ||
              data.nodes.length ===
                0) && (

              <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">

                <EmptyState
                  icon={
                    <Network className="h-5 w-5" />
                  }
                  title="Nothing to map yet"
                  description="Once you buy or save a product, your ShopGraph starts building connections."
                />

              </div>

            )}


          {/* GRAPH + DETAILS */}

          {!isLoading &&
            !isError &&
            data &&
            data.nodes.length >
              0 && (

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">


                {/* GRAPH */}

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm sm:p-3">

                  <ClientOnly
                    fallback={
                      <div className="h-[560px] w-full animate-pulse rounded-[1.5rem] bg-slate-100" />
                    }
                  >

                    <Suspense
                      fallback={
                        <div className="h-[560px] w-full animate-pulse rounded-[1.5rem] bg-slate-100" />
                      }
                    >

                      <GraphCanvas
                        payload={
                          data
                        }
                        selectedId={
                          selectedId
                        }
                        onSelect={
                          setSelectedId
                        }
                      />

                    </Suspense>

                  </ClientOnly>

                </div>


                {/* =================================================
                    SIDE PANEL
                ================================================= */}

                <aside className="h-fit overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">


                  {!selected ? (

                    <div className="p-7">


                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                        <Network className="h-5 w-5" />

                      </div>


                      <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">

                        Select a node

                      </h2>


                      <p className="mt-3 text-sm leading-6 text-slate-500">

                        Select any box in the graph to
                        explore what it represents and
                        see the relationships connected
                        to it.

                      </p>


                      <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">

                          Tip

                        </p>

                        <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">

                          Start with your user node and
                          follow the relationships outward.

                        </p>

                      </div>

                    </div>

                  ) : (

                    <SelectedNodePanel
                      selected={
                        selected
                      }
                      connections={
                        connections ??
                        []
                      }
                    />

                  )}

                </aside>

              </div>

            )}

        </section>


        {/* =================================================
            BOTTOM INFORMATION
        ================================================= */}

        {!isLoading &&
          !isError &&
          data &&
          data.nodes.length >
            0 && (

            <section className="mt-16 overflow-hidden rounded-[2rem] bg-indigo-50 px-7 py-9 sm:px-10">

              <div className="grid gap-8 lg:grid-cols-3">


                <InfoCard
                  number="01"
                  title="Find a node"
                  description="Select a person, product, brand or category in the graph."
                />


                <InfoCard
                  number="02"
                  title="Follow the relationship"
                  description="Look at the line connecting nodes to understand their relationship."
                />


                <InfoCard
                  number="03"
                  title="Discover products"
                  description="Use these connections to understand why products are relevant to you."
                />

              </div>

            </section>

          )}

      </main>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <SiteFooter />

    </div>

  );
}


/* =========================================================
   SELECTED NODE PANEL
========================================================= */

function SelectedNodePanel({
  selected,
  connections,
}: {
  selected: {
    type: string;

    label: string;

    brand?: string;

    category?: string;

    price?: number;
  };

  connections: {
    relation: string;

    label: string;
  }[];
}) {

  return (

    <div>


      {/* HEADER */}

      <div className="border-b border-slate-100 bg-slate-50 p-7">

        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-700">

          {selected.type}

        </span>


        <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">

          {selected.label}

        </h2>

      </div>


      {/* DETAILS */}

      <div className="p-7">


        <dl className="space-y-3">

          {selected.brand && (

            <Row
              label="Brand"
              value={
                selected.brand
              }
            />

          )}


          {selected.category && (

            <Row
              label="Category"
              value={
                selected.category
              }
            />

          )}


          {selected.price !==
            undefined && (

            <Row
              label="Price"
              value={formatPrice(
                selected.price,
              )}
            />

          )}


          <Row
            label="Relationships"
            value={String(
              connections.length,
            )}
          />

        </dl>


        {/* CONNECTIONS */}

        <div className="mt-7 border-t border-slate-100 pt-6">

          <div className="flex items-center justify-between">

            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">

              Connected

            </h3>


            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">

              {connections.length}

            </span>

          </div>


          {connections.length ===
          0 ? (

            <p className="mt-4 text-sm text-slate-500">

              No relationships found for
              this node.

            </p>

          ) : (

            <ul className="mt-4 space-y-2.5">

              {connections.map(
                (connection) => (

                  <li
                    key={`${connection.relation}-${connection.label}`}
                    className="rounded-2xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-indigo-100 hover:bg-indigo-50/30"
                  >

                    <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-500">

                      {
                        connection.relation
                      }

                    </span>


                    <span className="mt-1 block text-sm font-semibold text-slate-800">

                      {
                        connection.label
                      }

                    </span>

                  </li>

                ),
              )}

            </ul>

          )}

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   ROW
========================================================= */

function Row({
  label,
  value,
}: {
  label: string;

  value: string;
}) {

  return (

    <div className="flex items-center justify-between gap-4">

      <dt className="text-sm text-slate-500">

        {label}

      </dt>


      <dd className="text-right text-sm font-semibold text-slate-800">

        {value}

      </dd>

    </div>

  );
}


/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  number,
  title,
  description,
}: {
  number: string;

  title: string;

  description: string;
}) {

  return (

    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <span className="text-xs font-bold tracking-[0.15em] text-indigo-500">

        {number}

      </span>


      <h3 className="mt-3 font-semibold text-slate-950">

        {title}

      </h3>


      <p className="mt-2 text-sm leading-6 text-slate-500">

        {description}

      </p>

    </div>

  );
}