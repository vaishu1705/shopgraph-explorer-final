import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Compass,
  Eye,
  Heart,
  Link2,
  Network,
  ShoppingBag,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

import { SiteHeader } from "@/components/shop/SiteHeader";
import { productImages } from "@/data/images";
import { brandName, productById } from "@/data/mockData";
import { formatPrice } from "@/lib/format";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "ShopGraph — Shop Smarter Through Connections",
      },
      {
        name: "description",
        content:
          "ShopGraph connects what you buy, view and like to discover products through meaningful relationships.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "og:title",
        content:
          "ShopGraph — Shop Smarter Through Connections",
      },
      {
        property: "og:description",
        content:
          "Discover products through the relationships between people, products, brands and categories.",
      },
    ],
  }),

  component: HomePage,
});


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

const featuredIds = [
  "p-3",
  "p-13",
  "p-19",
  "p-31",
];

const featured = featuredIds
  .map((id) => productById(id)!)
  .filter(Boolean);


/* =========================================================
   HOW IT WORKS
========================================================= */

const pillars = [
  {
    number: "01",
    icon: UserRound,
    title: "Your Activity",
    body:
      "Your purchases, views and likes create meaningful signals about what you actually need.",
  },

  {
    number: "02",
    icon: Network,
    title: "Product Graph",
    body:
      "ShopGraph connects users, products, brands, categories and relationships into one connected graph.",
  },

  {
    number: "03",
    icon: BrainCircuit,
    title: "Smart Discovery",
    body:
      "Those relationships become personalized recommendations that you can actually understand.",
  },
];


/* =========================================================
   PAGE
========================================================= */

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <SiteHeader />

      <main>

        <Hero />

        <StatsBar />

        <HowItWorks />

        <FeaturedSection />

        <GraphStory />

        <WhyShopGraph />

        <FinalCta />

      </main>

      <HomeFooter />

    </div>
  );
}


/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">

      {/* Background glow */}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl"
      />


      {/* Grid background */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />


      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-24">


        {/* LEFT */}

        <div className="animate-rise">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">

            <span className="h-2 w-2 rounded-full bg-cyan-400" />

            Connected commerce

          </div>


          <h1 className="mt-7 max-w-3xl text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.7rem]">

            Shop smarter.

            <br />

            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Think in connections.
            </span>

          </h1>


          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">

            ShopGraph connects what you buy, view and like to help you discover products that actually belong in your world.

          </p>


          {/* Buttons */}

          <div className="mt-9 flex flex-wrap gap-3">

            <Link
              to="/explore"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              Explore Products

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </Link>


            <Link
              to="/recommendations"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >

              <Sparkles className="h-4 w-4 text-cyan-300" />

              Get Recommendations

            </Link>

          </div>


          {/* Mini stats */}

          <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-white/10 pt-7">

            <HeroStat
              value="50+"
              label="Products"
            />

            <HeroStat
              value="6"
              label="Relationships"
            />

            <HeroStat
              value="100%"
              label="Explainable"
            />

          </div>

        </div>


        {/* RIGHT */}

        <HeroGraph />

      </div>

    </section>
  );
}


/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

    </div>
  );
}


/* =========================================================
   HERO GRAPH
========================================================= */

function HeroGraph() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">

      {/* Glow */}

      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl"
      />


      <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-6">


        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 pb-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
              Live product graph
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Recommendation path
            </p>

          </div>


          <div className="flex items-center gap-1.5">

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs text-slate-400">
              Connected
            </span>

          </div>

        </div>


        {/* Graph */}

        <div className="relative mt-5 h-[25rem] overflow-hidden rounded-2xl bg-slate-950/70">


          {/* decorative grid */}

          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(148,163,184,.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />


          {/* SVG connections */}

          <svg
            viewBox="0 0 600 400"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >

            <defs>

              <linearGradient
                id="graphLine"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >

                <stop
                  offset="0%"
                  stopColor="#4F46E5"
                />

                <stop
                  offset="100%"
                  stopColor="#06B6D4"
                />

              </linearGradient>

            </defs>


            <line
              x1="110"
              y1="205"
              x2="235"
              y2="130"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

            <line
              x1="110"
              y1="205"
              x2="235"
              y2="280"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

            <line
              x1="235"
              y1="130"
              x2="375"
              y2="100"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

            <line
              x1="235"
              y1="130"
              x2="375"
              y2="205"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

            <line
              x1="235"
              y1="280"
              x2="375"
              y2="205"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

            <line
              x1="375"
              y1="205"
              x2="500"
              y2="150"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

            <line
              x1="375"
              y1="205"
              x2="500"
              y2="275"
              stroke="url(#graphLine)"
              strokeWidth="3"
            />

          </svg>


          {/* User */}

          <GraphNode
            className="left-[7%] top-[43%]"
            icon={<UserRound className="h-5 w-5" />}
            label="You"
            type="user"
          />


          {/* Laptop */}

          <GraphNode
            className="left-[34%] top-[22%]"
            icon={<ShoppingBag className="h-5 w-5" />}
            label="Laptop"
            type="product"
          />


          {/* Mouse */}

          <GraphNode
            className="left-[34%] top-[62%]"
            icon={<Sparkles className="h-5 w-5" />}
            label="Mouse"
            type="product"
          />


          {/* Similar */}

          <GraphNode
            className="left-[58%] top-[15%]"
            icon={<Link2 className="h-5 w-5" />}
            label="Similar"
            type="relation"
          />


          {/* Complementary */}

          <GraphNode
            className="left-[58%] top-[43%]"
            icon={<Network className="h-5 w-5" />}
            label="Complementary"
            type="relation"
          />


          {/* Recommendation */}

          <GraphNode
            className="left-[79%] top-[29%]"
            icon={<Sparkles className="h-5 w-5" />}
            label="Laptop Stand"
            type="recommendation"
          />


          {/* Match */}

          <div className="absolute bottom-5 left-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 backdrop-blur">

            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">
              Recommended
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Because you bought a laptop
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   GRAPH NODE
========================================================= */

function GraphNode({
  className,
  icon,
  label,
  type,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  type:
    | "user"
    | "product"
    | "relation"
    | "recommendation";
}) {

  const styles = {
    user:
      "border-violet-300/30 bg-violet-500/20 text-violet-200",

    product:
      "border-indigo-300/30 bg-indigo-500/20 text-indigo-200",

    relation:
      "border-cyan-300/30 bg-cyan-500/20 text-cyan-200",

    recommendation:
      "border-emerald-300/30 bg-emerald-500/20 text-emerald-200",
  };


  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`}
    >

      <div
        className={`flex items-center gap-2 rounded-xl border px-3 py-2 shadow-xl backdrop-blur ${styles[type]}`}
      >

        {icon}

        <span className="whitespace-nowrap text-xs font-semibold">
          {label}
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   STATS BAR
========================================================= */

function StatsBar() {
  return (
    <section className="border-b border-border bg-white">

      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-5 py-8 sm:grid-cols-4 lg:px-8">

        <MiniStat
          icon={<Network className="h-5 w-5" />}
          value="50+"
          label="Products connected"
        />

        <MiniStat
          icon={<Link2 className="h-5 w-5" />}
          value="100+"
          label="Product relationships"
        />

        <MiniStat
          icon={<BrainCircuit className="h-5 w-5" />}
          value="20"
          label="Connected users"
        />

        <MiniStat
          icon={<Sparkles className="h-5 w-5" />}
          value="100%"
          label="Explainable"
        />

      </div>

    </section>
  );
}


/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 first:pl-0 sm:px-6">

      <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
        {icon}
      </div>

      <div>

        <p className="text-xl font-bold text-slate-950">
          {value}
        </p>

        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
          {label}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

      <div className="max-w-3xl">

        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600">
          How it works
        </span>

        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Recommendations with a reason.
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          ShopGraph doesn't just tell you what to buy. It shows the
          connections that make a product relevant to you.
        </p>

      </div>


      <div className="mt-16 grid gap-8 md:grid-cols-3">

        {pillars.map((pillar) => (

          <div
            key={pillar.number}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >

            <div className="absolute right-6 top-6 text-5xl font-bold text-slate-100">
              {pillar.number}
            </div>


            <div className="relative">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">

                <pillar.icon className="h-5 w-5" />

              </div>


              <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-cyan-600">
                Step {pillar.number}
              </p>


              <h3 className="mt-2 text-2xl font-semibold">
                {pillar.title}
              </h3>


              <p className="mt-4 leading-relaxed text-slate-600">
                {pillar.body}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

function FeaturedSection() {
  return (
    <section className="bg-slate-50">

      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

        <div className="flex flex-wrap items-end justify-between gap-6">

          <div>

            <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              Explore
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Popular connections
            </h2>

            <p className="mt-3 text-slate-600">
              Products people are discovering together.
            </p>

          </div>


          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold transition-all hover:border-indigo-400 hover:text-indigo-600"
          >

            Browse all products

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

          </Link>

        </div>


        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {featured.map((product, index) => (

            <Link
              key={product.id}
              to="/products/$productId"
              params={{
                productId: product.id,
              }}
              className="group"
            >

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">

                <div className="relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    loading={
                      index === 0
                        ? "eager"
                        : "lazy"
                    }
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />


                  {index < 2 && (
                    <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-lg">
                      Popular together
                    </span>
                  )}

                </div>


                <div className="p-5">

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600">
                    {brandName(product.brandId)}
                  </p>


                  <h3 className="mt-2 font-semibold leading-snug">
                    {product.name}
                  </h3>


                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-xl font-bold">
                      {formatPrice(product.price)}
                    </span>


                    <span className="flex items-center gap-1 text-sm text-slate-500">

                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                      {product.rating.toFixed(1)}

                    </span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   GRAPH STORY
========================================================= */

const storyChain = [
  {
    label: "You",
    relation: "PURCHASED",
    type: "user",
  },

  {
    label: "Laptop",
    relation: "COMPLEMENTARY_TO",
    type: "product",
  },

  {
    label: "Laptop Stand",
    relation: null,
    type: "recommendation",
  },
];


function GraphStory() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />


      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">


        {/* LEFT */}

        <div>

          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300">
            The ShopGraph
          </span>


          <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            See the connection behind every recommendation.
          </h2>


          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Instead of a mysterious recommendation score, ShopGraph
            shows you the relationship that connects your activity to
            the product.
          </p>


          {/* Chain */}

          <ol className="mt-10">

            {storyChain.map((step, index) => (

              <li key={step.label}>

                <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">

                  {step.type === "user" && (
                    <UserRound className="h-4 w-4 text-violet-300" />
                  )}

                  {step.type === "product" && (
                    <ShoppingBag className="h-4 w-4 text-indigo-300" />
                  )}

                  {step.type === "recommendation" && (
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                  )}

                  <span className="text-sm font-semibold">
                    {step.label}
                  </span>

                </div>


                {step.relation && (

                  <div className="flex items-center gap-3 py-2 pl-7">

                    <span className="h-7 w-px bg-gradient-to-b from-indigo-400 to-cyan-400" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300">
                      {step.relation}
                    </span>

                  </div>

                )}

              </li>

            ))}

          </ol>


          <Link
            to="/graph"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5"
          >

            Open Graph Explorer

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

          </Link>

        </div>


        {/* RIGHT */}

        <div className="relative">

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">

            <img
              src={productImages["laptop-stand"]}
              alt="Laptop stand recommended from a laptop purchase"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-4/3 w-full rounded-[1.5rem] object-cover"
            />

          </div>


          <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-6">

            <div className="flex items-center gap-2">

              <Sparkles className="h-4 w-4 text-cyan-300" />

              <span className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-300">
                Why this product?
              </span>

            </div>


            <p className="mt-3 text-xl font-semibold">
              Your laptop led us here.
            </p>


            <p className="mt-3 leading-relaxed text-slate-400">
              The laptop stand is connected to the laptop through a
              complementary relationship. That's the reason it appears.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   WHY SHOPGRAPH
========================================================= */

function WhyShopGraph() {

  const features = [
    {
      icon: Link2,
      title: "Connected",
      text:
        "Products aren't isolated. They exist in a network of categories, brands and relationships.",
    },

    {
      icon: BrainCircuit,
      title: "Explainable",
      text:
        "Every recommendation can show the relationship that caused it to appear.",
    },

    {
      icon: Sparkles,
      title: "Personalized",
      text:
        "Your own purchases, views and likes shape the products you discover.",
    },
  ];


  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

      <div className="text-center">

        <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
          Why ShopGraph
        </span>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          A smarter way to discover products.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Move beyond endless product lists and discover what makes
          sense for you.
        </p>

      </div>


      <div className="mt-14 grid gap-6 md:grid-cols-3">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-600">

              <feature.icon className="h-6 w-6" />

            </div>


            <h3 className="mt-6 text-xl font-semibold">
              {feature.title}
            </h3>


            <p className="mt-3 leading-relaxed text-slate-600">
              {feature.text}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================================================
   FINAL CTA
========================================================= */

function FinalCta() {
  return (
    <section className="px-5 py-20 lg:px-8 lg:py-28">

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-950 px-8 py-20 text-center text-white shadow-2xl lg:px-16">

        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
        />


        <div className="relative">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">

            <Sparkles className="h-6 w-6 text-cyan-300" />

          </div>


          <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            Your next great find is already connected.
          </h2>


          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-indigo-100">
            Explore products through the relationships that matter to you.
          </p>


          <Link
            to="/explore"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
          >

            Explore ShopGraph

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

          </Link>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function HomeFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-14">

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">

              <Network className="h-4 w-4" />

            </div>

            <span className="text-xl font-bold tracking-tight">
              ShopGraph
            </span>

          </div>


          <p className="mt-3 text-sm text-slate-500">
            Shop smarter. Discover through connections.
          </p>

        </div>


        <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">

          <Link
            to="/explore"
            className="text-slate-500 transition-colors hover:text-indigo-600"
          >
            Explore
          </Link>


          <Link
            to="/recommendations"
            className="text-slate-500 transition-colors hover:text-indigo-600"
          >
            Recommendations
          </Link>


          <Link
            to="/graph"
            className="text-slate-500 transition-colors hover:text-indigo-600"
          >
            Graph Explorer
          </Link>


          <Link
            to="/profile"
            className="text-slate-500 transition-colors hover:text-indigo-600"
          >
            Profile
          </Link>

        </nav>

      </div>

    </footer>
  );
}