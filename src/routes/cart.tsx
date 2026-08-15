import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      {
        title: "Your Cart — ShopGraph",
      },
      {
        name: "description",
        content:
          "Review the products in your ShopGraph cart.",
      },
      {
        property: "og:title",
        content: "Your Cart — ShopGraph",
      },
      {
        property: "og:description",
        content:
          "Review the products you've selected.",
      },
    ],
  }),

  component: CartPage,
});

function CartPage() {
  const {
    items,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const delivery =
    cartTotal >= 50000
      ? 0
      : cartTotal > 0
        ? 499
        : 0;

  const finalTotal = cartTotal + delivery;

  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="max-w-2xl">

          <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
            Shopping Bag
          </span>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Your Cart
          </h1>

          <p className="mt-3 text-slate-500">
            {cartCount === 0
              ? "Your cart is empty."
              : `${cartCount} ${
                  cartCount === 1
                    ? "item"
                    : "items"
                } selected for checkout.`}
          </p>

        </header>


        {/* =====================================================
            EMPTY CART
        ===================================================== */}

        {items.length === 0 ? (

          <EmptyCart />

        ) : (

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* =================================================
                CART ITEMS
            ================================================= */}

            <section>

              <div className="mb-5 flex items-end justify-between">

                <div>

                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    Cart Items
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Adjust quantities or remove products.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Clear Cart
                </button>

              </div>


              {/* PRODUCT LIST */}

              <div className="space-y-4">

                {items.map((item) => (

                  <article
                    key={item.product.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                      {/* IMAGE */}

                      <Link
                        to="/products/$productId"
                        params={{
                          productId:
                            item.product.id,
                        }}
                        className="shrink-0"
                      >

                        <div className="h-28 w-28 overflow-hidden rounded-2xl bg-slate-100">

                          {item.product.image ? (

                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />

                          ) : (

                            <div className="flex h-full w-full items-center justify-center">

                              <ShoppingBag className="h-7 w-7 text-slate-400" />

                            </div>

                          )}

                        </div>

                      </Link>


                      {/* DETAILS */}

                      <div className="min-w-0 flex-1">

                        <Link
                          to="/products/$productId"
                          params={{
                            productId:
                              item.product.id,
                          }}
                          className="text-lg font-semibold text-slate-950 transition-colors hover:text-indigo-600"
                        >
                          {item.product.name}
                        </Link>

                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                          {item.product.description}
                        </p>

                        <p className="mt-3 text-lg font-bold text-slate-950">
                          {formatPrice(
                            item.product.price,
                          )}
                        </p>

                      </div>


                      {/* QUANTITY */}

                      <div className="flex items-center gap-3 sm:shrink-0">

                        <div className="flex items-center rounded-full border border-slate-200 bg-white">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.product.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600"
                            aria-label="Decrease quantity"
                          >

                            <Minus className="h-4 w-4" />

                          </button>

                          <span className="w-8 text-center text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.product.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600"
                            aria-label="Increase quantity"
                          >

                            <Plus className="h-4 w-4" />

                          </button>

                        </div>


                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${item.product.name}`}
                        >

                          <Trash2 className="h-4 w-4" />

                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/explore"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
              >

                Continue Shopping

                <ArrowRight className="h-4 w-4" />

              </Link>

            </section>


            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <aside className="h-fit lg:sticky lg:top-6">

              <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                  Order Summary
                </span>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  Your Order
                </h2>


                <div className="mt-7 space-y-5">

                  {/* ITEMS */}

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Items
                    </span>

                    <span className="font-semibold text-slate-900">
                      {cartCount}
                    </span>

                  </div>


                  {/* SUBTOTAL */}

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-semibold text-slate-900">
                      {formatPrice(
                        cartTotal,
                      )}
                    </span>

                  </div>


                  {/* DELIVERY */}

                  <div className="flex items-center justify-between text-sm">

                    <span className="flex items-center gap-2 text-slate-500">

                      <Truck className="h-4 w-4" />

                      Delivery

                    </span>

                    {delivery === 0 ? (

                      <span className="font-semibold text-emerald-600">
                        FREE
                      </span>

                    ) : (

                      <span className="font-semibold text-slate-900">
                        {formatPrice(
                          delivery,
                        )}
                      </span>

                    )}

                  </div>

                </div>


                {/* DIVIDER */}

                <div className="my-6 border-t border-slate-200" />


                {/* TOTAL */}

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-sm font-semibold text-slate-900">
                      Total
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Including delivery
                    </p>

                  </div>

                  <span className="text-2xl font-bold text-slate-950">
                    {formatPrice(
                      finalTotal,
                    )}
                  </span>

                </div>


                {/* CHECKOUT */}

                <Link
                  to="/checkout"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
                >

                  Proceed to Checkout

                  <ArrowRight className="h-4 w-4" />

                </Link>


                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Secure checkout with multiple payment options.
                </p>

              </section>

            </aside>

          </div>

        )}

      </main>

      <SiteFooter />

    </div>
  );
}


/* =========================================================
   EMPTY CART
========================================================= */

function EmptyCart() {
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="mx-auto max-w-xl px-6 py-16 text-center">

        {/* ICON */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

          <ShoppingBag className="h-7 w-7" />

        </div>


        {/* LABEL */}

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
          Nothing Here Yet
        </p>


        {/* TITLE */}

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Your cart is empty
        </h2>


        {/* DESCRIPTION */}

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Explore ShopGraph and discover products
          through meaningful shopping connections.
          Add a product you like and it will appear here.
        </p>


        {/* BUTTON */}

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