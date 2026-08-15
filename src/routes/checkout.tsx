import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/shop/SiteHeader";

import { useCart } from "@/context/CartContext";

import { formatPrice } from "@/lib/format";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute(
  "/checkout",
)({
  head: () => ({
    meta: [
      {
        title: "Checkout — ShopGraph",
      },
      {
        name: "description",
        content:
          "Complete your ShopGraph order securely.",
      },
    ],
  }),

  component: CheckoutPage,
});


/* =========================================================
   CHECKOUT PAGE
========================================================= */

function CheckoutPage() {

  const navigate =
    useNavigate();


  const {
    items,
    cartTotal,
    placeOrder,
  } = useCart();


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    phone,
    setPhone,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    state,
    setState,
  ] = useState("");

  const [
    pincode,
    setPincode,
  ] = useState("");


  /* =======================================================
     PAYMENT
  ======================================================= */

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<
    "card" | "upi" | "cod"
  >("upi");


  /* =======================================================
     VALIDATION
  ======================================================= */

  const [
    error,
    setError,
  ] = useState("");


  /* =======================================================
     TOTALS
  ======================================================= */

  const delivery =
    cartTotal >= 50000
      ? 0
      : 499;

  const grandTotal =
    cartTotal + delivery;


  /* =======================================================
     PLACE ORDER
  ======================================================= */

  function handlePlaceOrder(
    event: React.FormEvent,
  ) {

    event.preventDefault();

    setError("");


    /* -------------------------------------------------------
       CHECK CART
    ------------------------------------------------------- */

    if (items.length === 0) {

      setError(
        "Your cart is empty.",
      );

      return;
    }


    /* -------------------------------------------------------
       VALIDATE CUSTOMER DETAILS
    ------------------------------------------------------- */

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {

      setError(
        "Please fill in all delivery details.",
      );

      return;
    }


    /* -------------------------------------------------------
       PHONE VALIDATION
    ------------------------------------------------------- */

    if (
      !/^[0-9]{10}$/.test(
        phone,
      )
    ) {

      setError(
        "Please enter a valid 10-digit phone number.",
      );

      return;
    }


    /* -------------------------------------------------------
       PINCODE VALIDATION
    ------------------------------------------------------- */

    if (
      !/^[0-9]{6}$/.test(
        pincode,
      )
    ) {

      setError(
        "Please enter a valid 6-digit pincode.",
      );

      return;
    }


    /* -------------------------------------------------------
       EMAIL VALIDATION
    ------------------------------------------------------- */

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {

      setError(
        "Please enter a valid email address.",
      );

      return;
    }


    /* -------------------------------------------------------
       CREATE ORDER
    ------------------------------------------------------- */

    const order =
      placeOrder();


    if (!order) {

      setError(
        "Unable to place the order. Please try again.",
      );

      return;
    }


    /* -------------------------------------------------------
       GO TO ORDERS
    ------------------------------------------------------- */

    navigate({
      to: "/orders",
    });

  }


  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (items.length === 0) {

    return (
      <div className="min-h-screen bg-slate-50">

        <SiteHeader />


        <main className="mx-auto max-w-3xl px-5 py-20 lg:px-8">

          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

              <ShoppingBag className="h-7 w-7" />

            </div>


            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
              Your cart is empty
            </h1>


            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Add some products to your cart
              before proceeding to checkout.
            </p>


            <Link
              to="/explore"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
            >

              Explore Products

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

        </main>


        <SiteFooter />

      </div>
    );
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />


      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to Cart

        </Link>


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mt-8">

          <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
            Secure Checkout
          </span>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Complete your order
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Enter your delivery details and choose
            your preferred payment method.
          </p>

        </div>


        {/* =================================================
            FORM + SUMMARY
        ================================================= */}

        <form
          onSubmit={
            handlePlaceOrder
          }
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]"
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* -----------------------------------------------
                DELIVERY DETAILS
            ----------------------------------------------- */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                  <MapPin className="h-5 w-5" />

                </div>


                <div>

                  <h2 className="text-lg font-bold text-slate-950">
                    Delivery Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Where should we deliver your order?
                  </p>

                </div>

              </div>


              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div className="sm:col-span-2">

                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(
                        e.target.value,
                      )
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value,
                      )
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                {/* PHONE */}

                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(
                          /\D/g,
                          "",
                        ),
                      )
                    }
                    placeholder="10-digit mobile number"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                {/* ADDRESS */}

                <div className="sm:col-span-2">

                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    rows={3}
                    value={address}
                    onChange={(e) =>
                      setAddress(
                        e.target.value,
                      )
                    }
                    placeholder="House number, street, area"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                {/* CITY */}

                <div>

                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) =>
                      setCity(
                        e.target.value,
                      )
                    }
                    placeholder="City"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                {/* STATE */}

                <div>

                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) =>
                      setState(
                        e.target.value,
                      )
                    }
                    placeholder="State"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>


                {/* PINCODE */}

                <div>

                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) =>
                      setPincode(
                        e.target.value.replace(
                          /\D/g,
                          "",
                        ),
                      )
                    }
                    placeholder="6-digit pincode"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                PAYMENT
            ================================================= */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                  <Lock className="h-5 w-5" />

                </div>


                <div>

                  <h2 className="text-lg font-bold text-slate-950">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select how you would like to pay.
                  </p>

                </div>

              </div>


              <div className="mt-7 space-y-3">

                {/* UPI */}

                <PaymentOption
                  value="upi"
                  selected={
                    paymentMethod ===
                    "upi"
                  }
                  onSelect={() =>
                    setPaymentMethod(
                      "upi",
                    )
                  }
                  title="UPI"
                  description="Google Pay, PhonePe, Paytm and more"
                />


                {/* CARD */}

                <PaymentOption
                  value="card"
                  selected={
                    paymentMethod ===
                    "card"
                  }
                  onSelect={() =>
                    setPaymentMethod(
                      "card",
                    )
                  }
                  title="Credit / Debit Card"
                  description="Visa, Mastercard and other cards"
                />


                {/* COD */}

                <PaymentOption
                  value="cod"
                  selected={
                    paymentMethod ===
                    "cod"
                  }
                  onSelect={() =>
                    setPaymentMethod(
                      "cod",
                    )
                  }
                  title="Cash on Delivery"
                  description="Pay when your order arrives"
                />

              </div>

            </section>


            {/* ERROR */}

            {error && (

              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">

                {error}

              </div>

            )}

          </div>


          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside className="h-fit lg:sticky lg:top-24">

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {/* TITLE */}

              <div className="border-b border-slate-200 p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                    <Package className="h-5 w-5" />

                  </div>

                  <div>

                    <h2 className="font-bold text-slate-950">
                      Order Summary
                    </h2>

                    <p className="text-xs text-slate-500">
                      {items.length}{" "}
                      {items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                </div>

              </div>


              {/* PRODUCTS */}

              <div className="max-h-[360px] overflow-y-auto">

                {items.map(
                  (item) => (

                    <div
                      key={
                        item.product.id
                      }
                      className="flex gap-4 border-b border-slate-100 p-5"
                    >

                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">

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


                      <div className="min-w-0 flex-1">

                        <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Qty:{" "}
                          {item.quantity}
                        </p>

                        <p className="mt-2 text-sm font-bold text-slate-950">
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


              {/* TOTALS */}

              <div className="space-y-4 p-6">

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


                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="font-semibold text-slate-900">

                    {delivery === 0
                      ? "FREE"
                      : formatPrice(
                          delivery,
                        )}

                  </span>

                </div>


                {delivery === 0 && (

                  <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">

                    Free delivery on
                    orders above ₹50,000

                  </div>

                )}


                <div className="border-t border-slate-200 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-slate-950">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-slate-950">
                      {formatPrice(
                        grandTotal,
                      )}
                    </span>

                  </div>

                </div>


                {/* PLACE ORDER */}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
                >

                  <Check className="h-4 w-4" />

                  Place Order

                </button>


                {/* SECURITY */}

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">

                  <Lock className="h-3.5 w-3.5" />

                  Secure checkout

                </div>

              </div>

            </section>

          </aside>

        </form>

      </main>


      <SiteFooter />

    </div>
  );
}


/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
  value,
  selected,
  onSelect,
  title,
  description,
}: {
  value: string;
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
}) {

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
          : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
      }`}
    >

      {/* RADIO */}

      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected
            ? "border-indigo-600"
            : "border-slate-300"
        }`}
      >

        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
        )}

      </span>


      {/* CONTENT */}

      <span className="flex-1">

        <span className="block text-sm font-bold text-slate-950">
          {title}
        </span>

        <span className="mt-1 block text-xs text-slate-500">
          {description}
        </span>

      </span>

    </button>
  );
}


/* =========================================================
   REACT IMPORT
========================================================= */

import { useState } from "react";