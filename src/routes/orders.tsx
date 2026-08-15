import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import {
  useCart,
  type Order,
} from "@/context/CartContext";

import { formatPrice } from "@/lib/format";


export const Route = createFileRoute(
  "/orders",
)({
  head: () => ({
    meta: [
      {
        title:
          "My Orders — ShopGraph",
      },
      {
        name: "description",
        content:
          "View your ShopGraph orders and purchase history.",
      },
    ],
  }),

  component: OrdersPage,
});


function OrdersPage() {

  const {
    orders,
  } = useCart();


  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />


      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">

        {/* HEADER */}

        <header className="max-w-2xl">

          <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
            Shopping History
          </span>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            My Orders
          </h1>

          <p className="mt-3 text-slate-500">
            View your purchases and track your orders.
          </p>

        </header>


        {/* ORDER COUNT */}

        <div className="mt-8 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">

            <Package className="h-5 w-5" />

          </div>

          <div>

            <p className="text-sm font-semibold text-slate-950">
              {orders.length}{" "}
              {orders.length === 1
                ? "Order"
                : "Orders"}
            </p>

            <p className="text-xs text-slate-500">
              Your ShopGraph purchases
            </p>

          </div>

        </div>


        {/* ORDERS */}

        {orders.length === 0 ? (

          <EmptyOrders />

        ) : (

          <div className="mt-8 space-y-6">

            {orders.map(
              (order) => (

                <OrderCard
                  key={order.id}
                  order={order}
                />

              ),
            )}

          </div>

        )}

      </main>


      <SiteFooter />

    </div>
  );
}


/* =========================================================
   ORDER CARD
========================================================= */

function OrderCard({
  order,
}: {
  order: Order;
}) {

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-base font-bold text-slate-950">
              Order #{order.id}
            </h2>

            <StatusBadge
              status={order.status}
            />

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Placed on{" "}
            {new Date(
              order.date,
            ).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )}
          </p>

        </div>


        <div className="sm:text-right">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Order Total
          </p>

          <p className="mt-1 text-lg font-bold text-slate-950">
            {formatPrice(
              order.total,
            )}
          </p>

        </div>

      </div>


      {/* PRODUCTS */}

      <div className="divide-y divide-slate-200">

        {order.items.map(
          (item) => (

            <div
              key={
                item.product.id
              }
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-6"
            >

              {/* IMAGE */}

              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100">

                <img
                  src={
                    item.product.image
                  }
                  alt={
                    item.product.name
                  }
                  className="h-full w-full object-cover"
                />

              </div>


              {/* PRODUCT */}

              <div className="min-w-0 flex-1">

                <h3 className="text-base font-semibold text-slate-950">
                  {item.product.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Quantity:{" "}
                  {item.quantity}
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {formatPrice(
                    item.product.price,
                  )}
                </p>

              </div>


              {/* TOTAL */}

              <div className="sm:text-right">

                <p className="text-xs text-slate-400">
                  Item total
                </p>

                <p className="mt-1 font-semibold text-slate-950">
                  {formatPrice(
                    item.product.price *
                      item.quantity,
                  )}
                </p>

              </div>

            </div>

          ),
        )}

      </div>


      {/* FOOTER */}

      <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <OrderProgress
          status={order.status}
        />


        <Link
          to="/explore"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
        >

          Continue Shopping

          <ArrowRight className="h-4 w-4" />

        </Link>

      </div>

    </article>
  );
}


/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: Order["status"];
}) {

  const styles = {

    Processing:
      "bg-amber-50 text-amber-700 border-amber-200",

    Shipped:
      "bg-blue-50 text-blue-700 border-blue-200",

    Delivered:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    Cancelled:
      "bg-red-50 text-red-700 border-red-200",

  };


  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}


/* =========================================================
   PROGRESS
========================================================= */

function OrderProgress({
  status,
}: {
  status: Order["status"];
}) {

  if (
    status ===
    "Delivered"
  ) {

    return (
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">

        <CheckCircle2 className="h-4 w-4" />

        Delivered successfully

      </div>
    );

  }


  if (
    status ===
    "Shipped"
  ) {

    return (
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

        <Truck className="h-4 w-4" />

        On the way

      </div>
    );

  }


  if (
    status ===
    "Cancelled"
  ) {

    return (
      <div className="flex items-center gap-2 text-sm font-medium text-red-600">

        <Clock3 className="h-4 w-4" />

        Order cancelled

      </div>
    );

  }


  return (
    <div className="flex items-center gap-2 text-sm font-medium text-amber-600">

      <Clock3 className="h-4 w-4" />

      Preparing your order

    </div>
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyOrders() {

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="mx-auto max-w-xl px-6 py-16 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

          <ShoppingBag className="h-7 w-7" />

        </div>


        <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
          No Orders Yet
        </p>


        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          You haven't placed an order
        </h2>


        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Explore ShopGraph, add products to
          your cart and complete your first order.
        </p>


        <Link
          to="/explore"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
        >

          Explore Products

          <ArrowRight className="h-4 w-4" />

        </Link>

      </div>

    </section>
  );
}