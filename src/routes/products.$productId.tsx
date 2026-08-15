import { useState } from "react";

import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Network,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import {
  ProductCard,
} from "@/components/shop/ProductCard";

import {
  ProductImage,
} from "@/components/shop/ProductImage";

import {
  RelationPath,
} from "@/components/shop/RelationPath";

import {
  ErrorState,
  ProductGridSkeleton,
} from "@/components/shop/states";

import {
  brandName,
  categoryName,
} from "@/data/mockData";

import type {
  Product,
} from "@/data/types";

import {
  formatPrice,
} from "@/lib/format";

import {
  cn,
} from "@/lib/utils";

import {
  getAlsoBoughtProducts,
  getComplementaryProducts,
  getProduct,
  getSimilarProducts,
} from "@/services/productService";

import {
  useCart,
} from "@/context/CartContext";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute(
  "/products/$productId",
)({

  head: () => ({

    meta: [

      {
        title:
          "Product Details — ShopGraph",
      },

      {
        name: "description",
        content:
          "Explore product details, connected products and explainable recommendations on ShopGraph.",
      },

      {
        property: "og:title",
        content:
          "Product Details — ShopGraph",
      },

      {
        property: "og:description",
        content:
          "Discover products through meaningful shopping connections.",
      },

    ],

  }),

  component: ProductPage,

});


/* =========================================================
   PRODUCT PAGE
========================================================= */

function ProductPage() {

  const {
    productId,
  } = Route.useParams();


  const [
    wishlisted,
    setWishlisted,
  ] = useState(false);


  /* =======================================================
     CART
  ======================================================= */

  const {
    addToCart,
  } = useCart();


  /* =======================================================
     PRODUCT
  ======================================================= */

  const product =
    useQuery({

      queryKey: [
        "product",
        productId,
      ],

      queryFn: () =>
        getProduct(
          productId,
        ),

    });


  /* =======================================================
     SIMILAR
  ======================================================= */

  const similar =
    useQuery({

      queryKey: [
        "similar",
        productId,
      ],

      queryFn: () =>
        getSimilarProducts(
          productId,
        ),

    });


  /* =======================================================
     COMPLEMENTARY
  ======================================================= */

  const setup =
    useQuery({

      queryKey: [
        "complementary",
        productId,
      ],

      queryFn: () =>
        getComplementaryProducts(
          productId,
        ),

    });


  /* =======================================================
     ALSO BOUGHT
  ======================================================= */

  const alsoBought =
    useQuery({

      queryKey: [
        "also-bought",
        productId,
      ],

      queryFn: () =>
        getAlsoBoughtProducts(
          productId,
        ),

    });


  /* =======================================================
     PRODUCT ERROR
  ======================================================= */

  if (product.isError) {

    return (

      <div className="min-h-screen bg-slate-50">

        <SiteHeader />

        <main className="mx-auto max-w-3xl px-5 py-20">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <ErrorState
              onRetry={() =>
                product.refetch()
              }
              message="We couldn't load this product. It may have been moved."
            />

          </div>

        </main>

        <SiteFooter />

      </div>

    );
  }


  const p =
    product.data;


  return (

    <div className="min-h-screen bg-slate-50">


      {/* ===================================================
          HEADER
      =================================================== */}

      <SiteHeader />


      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8 lg:pt-10">


        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-indigo-200 hover:text-indigo-600"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to products

        </Link>


        {/* =================================================
            LOADING
        ================================================= */}

        {!p ? (

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            <div className="aspect-square animate-pulse rounded-[2rem] bg-slate-200" />

            <div className="space-y-5 rounded-[2rem] bg-white p-8">

              <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />

              <div className="h-12 w-3/4 animate-pulse rounded-xl bg-slate-200" />

              <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />

              <div className="h-10 w-40 animate-pulse rounded-xl bg-slate-200" />

              <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-200" />

              <div className="h-12 w-full animate-pulse rounded-full bg-slate-200" />

            </div>

          </div>

        ) : (

          <>


            {/* =================================================
                PRODUCT HERO
            ================================================= */}

            <section className="mt-7 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl">


              <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">


                {/* DECORATIVE BACKGROUND */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />


                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="relative p-5 sm:p-8 lg:p-10">

                  <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white">

                    <ProductImage
                      src={p.image}
                      alt={p.name}
                      eager
                    />

                  </div>


                  {/* CATEGORY BADGE */}

                  <div className="absolute left-9 top-9 sm:left-12 sm:top-12">

                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-indigo-200 shadow-lg backdrop-blur">

                      <Sparkles className="h-3.5 w-3.5" />

                      {categoryName(
                        p.categoryId,
                      )}

                    </span>

                  </div>

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="relative flex flex-col justify-center px-7 pb-9 pt-2 sm:px-10 sm:pb-12 lg:px-12 lg:py-12">


                  {/* BRAND */}

                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">

                    {brandName(
                      p.brandId,
                    )}

                  </p>


                  {/* NAME */}

                  <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">

                    {p.name}

                  </h1>


                  {/* RATING */}

                  <div className="mt-5 flex flex-wrap items-center gap-3">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">

                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                      {p.rating.toFixed(
                        1,
                      )}

                    </span>


                    <span className="text-sm text-slate-400">

                      {p.reviews.toLocaleString(
                        "en-IN",
                      )}{" "}
                      ratings

                    </span>

                  </div>


                  {/* PRICE */}

                  <p className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">

                    {formatPrice(
                      p.price,
                    )}

                  </p>


                  {/* DESCRIPTION */}

                  <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">

                    {p.description ||
                      "A carefully selected product connected to the ShopGraph ecosystem."}

                  </p>


                  {/* FEATURES */}

                  {p.features.length >
                    0 && (

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">

                      {p.features.map(
                        (
                          feature,
                        ) => (

                          <div
                            key={
                              feature
                            }
                            className="flex items-start gap-2.5 text-sm text-slate-200"
                          >

                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">

                              <Check className="h-3 w-3" />

                            </span>

                            {feature}

                          </div>

                        ),
                      )}

                    </div>

                  )}


                  {/* ACTIONS */}

                  <div className="mt-8 flex flex-wrap gap-3">


                    {/* ADD TO CART */}

                    <button
                      type="button"
                      onClick={() =>
                        addToCart(p)
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
                    >

                      <ShoppingBag className="h-4 w-4" />

                      Add to Cart

                    </button>


                    {/* WISHLIST */}

                    <button
                      type="button"
                      onClick={() =>
                        setWishlisted(
                          (
                            value,
                          ) =>
                            !value,
                        )
                      }
                      aria-pressed={
                        wishlisted
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                    >

                      <Heart
                        className={cn(
                          "h-4 w-4",
                          wishlisted &&
                            "fill-rose-400 text-rose-400",
                        )}
                      />

                      {wishlisted
                        ? "Saved"
                        : "Wishlist"}

                    </button>

                  </div>


                  {/* CART LINK */}

                  <Link
                    to="/cart"
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                  >

                    <ShoppingBag className="h-4 w-4" />

                    View Cart

                    <ArrowRight className="h-3.5 w-3.5" />

                  </Link>

                </div>

              </div>

            </section>


            {/* =================================================
                CONNECTION EXPLANATION
            ================================================= */}

            <section className="mt-10">

              <div className="overflow-hidden rounded-[2rem] border border-indigo-100 bg-white shadow-sm">

                <div className="grid lg:grid-cols-[1fr_auto]">


                  {/* TEXT */}

                  <div className="p-7 sm:p-9 lg:p-12">

                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-700">

                      <Network className="h-3.5 w-3.5" />

                      Explainable recommendation

                    </div>


                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

                      Why this product may be relevant to you

                    </h2>


                    <p className="mt-4 max-w-2xl leading-7 text-slate-600">

                      ShopGraph uses relationships between
                      users and products to explain why
                      something appears in your recommendations.
                      There is no hidden black box behind this
                      connection.

                    </p>


                    <div className="mt-6 flex flex-wrap gap-2">

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        PURCHASED
                      </span>

                      <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                        COMPLEMENTARY_TO
                      </span>

                      <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700">
                        CONNECTED
                      </span>

                    </div>

                  </div>


                  {/* RELATION PATH */}

                  <div className="flex items-center justify-center border-t border-slate-100 bg-slate-50 p-7 lg:border-l lg:border-t-0 lg:p-10">

                    <RelationPath
                      className="mx-auto"
                      steps={[
                        {
                          label: "You",
                          kind: "user",
                        },

                        {
                          label:
                            "PURCHASED",
                          kind: "relation",
                        },

                        {
                          label:
                            "Laptop",
                          kind: "product",
                        },

                        {
                          label:
                            "COMPLEMENTARY_TO",
                          kind: "relation",
                        },

                        {
                          label:
                            p.name,
                          kind: "product",
                        },
                      ]}
                    />

                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                SIMILAR
            ================================================= */}

            <ProductRow
              title="Similar Products"
              subtitle="Products that are closely connected to this one."
              icon="similar"
              query={similar}
            />


            {/* =================================================
                SETUP
            ================================================= */}

            <ProductRow
              title="Complete Your Setup"
              subtitle="Products that pair naturally with your current selection."
              icon="setup"
              query={setup}
            />


            {/* =================================================
                ALSO BOUGHT
            ================================================= */}

            <ProductRow
              title="Customers Also Bought"
              subtitle="Products connected through shopping activity."
              icon="bought"
              query={alsoBought}
            />

          </>

        )}

      </main>


      <SiteFooter />

    </div>

  );
}


/* =========================================================
   PRODUCT ROW
========================================================= */

function ProductRow({
  title,
  subtitle,
  icon,
  query,
}: {
  title: string;

  subtitle: string;

  icon:
    | "similar"
    | "setup"
    | "bought";

  query: {
    data?:
      | Product[]
      | undefined;

    isLoading: boolean;

    isError: boolean;

    refetch: () => void;
  };
}) {

  return (

    <section className="mt-16">


      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">

              {icon === "similar" && (
                <Sparkles className="h-4 w-4" />
              )}

              {icon === "setup" && (
                <Network className="h-4 w-4" />
              )}

              {icon === "bought" && (
                <ShoppingBag className="h-4 w-4" />
              )}

            </span>


            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              Connected products
            </p>

          </div>


          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

            {title}

          </h2>


          <p className="mt-2 text-sm leading-6 text-slate-500">

            {subtitle}

          </p>

        </div>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mt-7">


        {/* LOADING */}

        {query.isLoading && (

          <ProductGridSkeleton
            count={4}
          />

        )}


        {/* ERROR */}

        {!query.isLoading &&
          query.isError && (

            <div className="rounded-3xl border border-red-100 bg-white p-10 shadow-sm">

              <ErrorState
                onRetry={
                  query.refetch
                }
                message="We couldn't load the connected products. Please try again."
              />

            </div>

          )}


        {/* EMPTY */}

        {!query.isLoading &&
          !query.isError &&
          (!query.data ||
            query.data.length ===
              0) && (

            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">

                <Network className="h-5 w-5 text-slate-400" />

              </div>


              <h3 className="mt-4 text-lg font-semibold text-slate-900">

                No connected products yet

              </h3>


              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                We don't have enough relationship data
                to show products in this section yet.

              </p>

            </div>

          )}


        {/* PRODUCTS */}

        {!query.isLoading &&
          !query.isError &&
          query.data &&
          query.data.length > 0 && (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {query.data
                .slice(0, 4)
                .map(
                  (
                    connectedProduct,
                  ) => (

                    <ProductCard
                      key={
                        connectedProduct.id
                      }
                      product={
                        connectedProduct
                      }
                    />

                  ),
                )}

            </div>

          )}

      </div>

    </section>

  );
}