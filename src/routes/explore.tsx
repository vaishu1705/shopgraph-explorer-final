import { useState } from "react";

import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import {
  ProductCard,
} from "@/components/shop/ProductCard";

import {
  EmptyState,
  ErrorState,
  ProductGridSkeleton,
} from "@/components/shop/states";

import {
  brands,
  categories,
} from "@/data/mockData";

import {
  getProducts,
  type ProductQuery,
} from "@/services/productService";

import {
  formatPrice,
} from "@/lib/format";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute(
  "/explore",
)({

  head: () => ({

    meta: [

      {
        title:
          "Explore Products — ShopGraph",
      },

      {
        name: "description",
        content:
          "Discover products through ShopGraph's connected catalogue.",
      },

      {
        property: "og:title",
        content:
          "Explore Products — ShopGraph",
      },

      {
        property: "og:description",
        content:
          "Search, filter and discover products through connected shopping relationships.",
      },

    ],

  }),

  component: ExplorePage,

});


/* =========================================================
   SORT OPTIONS
========================================================= */

const sorts: {
  value: NonNullable<
    ProductQuery["sort"]
  >;

  label: string;
}[] = [

  {
    value: "recommended",
    label: "Recommended",
  },

  {
    value: "popular",
    label: "Most Popular",
  },

  {
    value: "price-asc",
    label: "Price: Low to High",
  },

  {
    value: "price-desc",
    label: "Price: High to Low",
  },

];


const MAX_PRICE = 140000;


/* =========================================================
   PAGE
========================================================= */

function ExplorePage() {

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    categoryId,
    setCategoryId,
  ] = useState("");

  const [
    brandId,
    setBrandId,
  ] = useState("");

  const [
    maxPrice,
    setMaxPrice,
  ] = useState(MAX_PRICE);

  const [
    minRating,
    setMinRating,
  ] = useState(0);

  const [
    sort,
    setSort,
  ] =
    useState<
      NonNullable<
        ProductQuery["sort"]
      >
    >("recommended");


  /* =======================================================
     QUERY
  ======================================================= */

  const query: ProductQuery = {

    search,

    categoryId,

    brandId,

    maxPrice,

    minRating,

    sort,

  };


  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({

    queryKey: [
      "products",
      query,
    ],

    queryFn: () =>
      getProducts(query),

  });


  /* =======================================================
     RESET FILTERS
  ======================================================= */

  function clearFilters() {

    setSearch("");

    setCategoryId("");

    setBrandId("");

    setMaxPrice(
      MAX_PRICE,
    );

    setMinRating(0);

    setSort(
      "recommended",
    );

  }


  const hasFilters =
    search !== "" ||
    categoryId !== "" ||
    brandId !== "" ||
    maxPrice !== MAX_PRICE ||
    minRating !== 0 ||
    sort !== "recommended";


  /* =======================================================
     SELECT STYLE
  ======================================================= */

  const selectClass = `
    h-12
    w-full
    appearance-none
    rounded-xl
    border
    border-slate-200
    bg-white
    px-4
    pr-10
    text-sm
    font-semibold
    text-slate-700
    outline-none
    transition-all
    hover:border-indigo-200
    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-500/10
  `;


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


          {/* decorative circles */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />


          <div className="relative max-w-3xl">


            {/* EYEBROW */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">

              <Sparkles className="h-3.5 w-3.5" />

              Connected shopping

            </div>


            {/* TITLE */}

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">

              Explore products
              <span className="text-indigo-400">
                .
              </span>

            </h1>


            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">

              Discover products, brands and categories
              through the connections that make shopping
              smarter.

            </p>


            {/* SEARCH */}

            <div className="mt-8 flex items-center rounded-2xl border border-white/10 bg-white px-4 py-2 shadow-lg sm:px-5">

              <Search className="h-5 w-5 shrink-0 text-slate-400" />


              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search products, brands or categories..."
                aria-label="Search products, brands or categories"
                className="h-12 w-full bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
              />


              {search && (

                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >

                  <X className="h-4 w-4" />

                </button>

              )}

            </div>


            {/* PRODUCT COUNT */}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">

              <span className="rounded-full bg-white/10 px-3 py-1.5 font-semibold text-slate-200">

                {data
                  ? `${data.length} products`
                  : "Browse catalogue"}

              </span>


              <span className="text-slate-400">
                Find something that fits you
              </span>

            </div>

          </div>

        </section>


        {/* =================================================
            FILTER SECTION
        ================================================= */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">


          {/* FILTER HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <SlidersHorizontal className="h-5 w-5" />

              </div>


              <div>

                <h2 className="font-semibold text-slate-950">
                  Refine your search
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Filter products to find the right match
                </p>

              </div>

            </div>


            {hasFilters && (

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 self-start rounded-full px-3.5 py-2 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-50 sm:self-auto"
              >

                <X className="h-3.5 w-3.5" />

                Clear filters

              </button>

            )}

          </div>


          {/* FILTERS */}

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">


            {/* CATEGORY */}

            <FilterSelect
              label="Category"
              value={categoryId}
              onChange={setCategoryId}
              className={selectClass}
            >

              <option value="">
                All categories
              </option>

              {categories.map(
                (category) => (

                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>

                ),
              )}

            </FilterSelect>


            {/* BRAND */}

            <FilterSelect
              label="Brand"
              value={brandId}
              onChange={setBrandId}
              className={selectClass}
            >

              <option value="">
                All brands
              </option>

              {brands.map(
                (brand) => (

                  <option
                    key={brand.id}
                    value={brand.id}
                  >
                    {brand.name}
                  </option>

                ),
              )}

            </FilterSelect>


            {/* RATING */}

            <FilterSelect
              label="Rating"
              value={String(
                minRating,
              )}
              onChange={(value) =>
                setMinRating(
                  Number(value),
                )
              }
              className={selectClass}
            >

              <option value="0">
                Any rating
              </option>

              <option value="4">
                4.0+ rating
              </option>

              <option value="4.5">
                4.5+ rating
              </option>

            </FilterSelect>


            {/* SORT */}

            <FilterSelect
              label="Sort by"
              value={sort}
              onChange={(value) =>
                setSort(
                  value as NonNullable<
                    ProductQuery["sort"]
                  >,
                )
              }
              className={selectClass}
            >

              {sorts.map(
                (item) => (

                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>

                ),
              )}

            </FilterSelect>


            {/* PRICE */}

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">

                Maximum price

              </label>


              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-medium text-slate-500">
                    Up to
                  </span>

                  <span className="text-sm font-bold text-indigo-600">
                    {formatPrice(
                      maxPrice,
                    )}
                  </span>

                </div>


                <input
                  type="range"
                  min={2000}
                  max={MAX_PRICE}
                  step={1000}
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(
                      Number(
                        event.target.value,
                      ),
                    )
                  }
                  aria-label="Maximum price"
                  className="mt-2 w-full accent-indigo-600"
                />

              </div>

            </div>

          </div>


          {/* ACTIVE FILTERS */}

          {hasFilters && (

            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">

              <span className="text-xs font-semibold text-slate-400">
                Active:
              </span>


              {categoryId && (

                <FilterBadge
                  label={
                    categories.find(
                      (item) =>
                        item.id ===
                        categoryId,
                    )?.name ??
                    "Category"
                  }
                  onRemove={() =>
                    setCategoryId("")
                  }
                />

              )}


              {brandId && (

                <FilterBadge
                  label={
                    brands.find(
                      (item) =>
                        item.id ===
                        brandId,
                    )?.name ??
                    "Brand"
                  }
                  onRemove={() =>
                    setBrandId("")
                  }
                />

              )}


              {minRating > 0 && (

                <FilterBadge
                  label={`${minRating}+ rating`}
                  onRemove={() =>
                    setMinRating(0)
                  }
                />

              )}


              {maxPrice <
                MAX_PRICE && (

                <FilterBadge
                  label={`Up to ${formatPrice(
                    maxPrice,
                  )}`}
                  onRemove={() =>
                    setMaxPrice(
                      MAX_PRICE,
                    )
                  }
                />

              )}

            </div>

          )}

        </section>


        {/* =================================================
            RESULTS
        ================================================= */}

        <section className="mt-10">


          {/* RESULT HEADER */}

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                Product catalogue
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">

                {isLoading
                  ? "Finding products..."
                  : `${data?.length ?? 0} products found`}

              </h2>

            </div>


            {!isLoading &&
              data &&
              data.length > 0 && (

                <p className="text-sm text-slate-500">
                  Showing the best matches for your filters
                </p>

              )}

          </div>


          {/* LOADING */}

          {isLoading && (

            <ProductGridSkeleton />

          )}


          {/* ERROR */}

          {isError && !isLoading && (

            <div className="rounded-3xl border border-red-100 bg-white p-10">

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
              data.length === 0) && (

              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

                <EmptyState
                  icon={
                    <PackageSearch className="h-5 w-5" />
                  }
                  title="No products match those filters"
                  description="Try widening your price range or clearing the category and brand filters."
                />

              </div>

            )}


          {/* PRODUCTS */}

          {!isLoading &&
            !isError &&
            data &&
            data.length > 0 && (

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {data.map(
                  (
                    product,
                    index,
                  ) => (

                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                      eager={
                        index < 4
                      }
                    />

                  ),
                )}

              </div>

            )}

        </section>


        {/* =================================================
            BOTTOM MESSAGE
        ================================================= */}

        {!isLoading &&
          data &&
          data.length > 0 && (

            <section className="mt-16 overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50/60 px-7 py-8 sm:px-10">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <Sparkles className="h-4 w-4 text-indigo-600" />

                    <span className="text-sm font-bold text-indigo-700">
                      Shop through connections
                    </span>

                  </div>


                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">

                    ShopGraph doesn't just show products.
                    It connects products, brands, categories
                    and your shopping activity to help you
                    discover what makes sense next.

                  </p>

                </div>


                <div className="shrink-0 rounded-2xl bg-white px-5 py-4 shadow-sm">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your discovery
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Search → Connect → Discover
                  </p>

                </div>

              </div>

            </section>

          )}

      </main>


      <SiteFooter />

    </div>

  );
}


/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  className,
  children,
}: {
  label: string;

  value: string;

  onChange: (
    value: string,
  ) => void;

  className: string;

  children: React.ReactNode;
}) {

  return (

    <div>

      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">

        {label}

      </label>


      <div className="relative">

        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className={
            className
          }
        >

          {children}

        </select>


        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      </div>

    </div>

  );
}


/* =========================================================
   FILTER BADGE
========================================================= */

function FilterBadge({
  label,
  onRemove,
}: {
  label: string;

  onRemove: () => void;
}) {

  return (

    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">

      {label}

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="rounded-full p-0.5 transition-colors hover:bg-indigo-100"
      >

        <X className="h-3 w-3" />

      </button>

    </span>

  );
}