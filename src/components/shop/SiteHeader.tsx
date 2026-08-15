import { useState } from "react";
import {
  Link,
  useLocation,
} from "@tanstack/react-router";

import {
  Home,
  Menu,
  Network,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
  ClipboardList,
} from "lucide-react";

import { useCart } from "@/context/CartContext";


/* =========================================================
   HEADER
========================================================= */

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const location = useLocation();

  const { cartCount } = useCart();


  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };


  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  function closeMobileMenu() {
    setMobileOpen(false);
  }


  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2.5"
        >

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">

            <Network className="h-4 w-4" />

          </div>


          <div className="hidden sm:block">

            <span className="block text-lg font-bold leading-none tracking-tight text-slate-950">
              ShopGraph
            </span>

            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Connected commerce
            </span>

          </div>

        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-1 md:flex">

          <NavItem
            to="/"
            label="Home"
            icon={
              <Home className="h-4 w-4" />
            }
            active={isActive("/")}
          />


          <NavItem
            to="/explore"
            label="Explore"
            icon={
              <Search className="h-4 w-4" />
            }
            active={isActive("/explore")}
          />


          <NavItem
            to="/recommendations"
            label="Recommendations"
            icon={
              <Sparkles className="h-4 w-4" />
            }
            active={isActive("/recommendations")}
          />


          <NavItem
            to="/graph"
            label="Graph"
            icon={
              <Network className="h-4 w-4" />
            }
            active={isActive("/graph")}
          />


          {/* MY ORDERS */}

          <NavItem
            to="/orders"
            label="My Orders"
            icon={
              <ClipboardList className="h-4 w-4" />
            }
            active={isActive("/orders")}
          />

        </nav>


        {/* =================================================
            RIGHT ACTIONS
        ================================================= */}

        <div className="flex items-center gap-2">

          {/* PROFILE */}

          <Link
            to="/profile"
            className={`
              hidden
              h-10
              items-center
              gap-2
              rounded-full
              px-3
              text-sm
              font-semibold
              transition-colors
              sm:flex

              ${
                isActive("/profile")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }
            `}
          >

            <UserRound className="h-4 w-4" />

            <span className="hidden lg:inline">
              Profile
            </span>

          </Link>


          {/* CART */}

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className={`
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              transition-all

              ${
                isActive("/cart")
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              }
            `}
          >

            <ShoppingBag className="h-4 w-4" />


            {/* CART COUNT */}

            {cartCount > 0 && (

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold leading-none text-white shadow-sm">

                {cartCount > 99
                  ? "99+"
                  : cartCount}

              </span>

            )}

          </Link>


          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (value) => !value,
              )
            }
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          >

            {mobileOpen ? (

              <X className="h-5 w-5" />

            ) : (

              <Menu className="h-5 w-5" />

            )}

          </button>

        </div>

      </div>


      {/* ===================================================
          MOBILE NAVIGATION
      =================================================== */}

      {mobileOpen && (

        <div className="border-t border-slate-200 bg-white md:hidden">

          <nav className="mx-auto max-w-7xl px-5 py-4">

            <MobileNavItem
              to="/"
              label="Home"
              icon={
                <Home className="h-5 w-5" />
              }
              active={isActive("/")}
              onClick={closeMobileMenu}
            />


            <MobileNavItem
              to="/explore"
              label="Explore Products"
              icon={
                <Search className="h-5 w-5" />
              }
              active={isActive("/explore")}
              onClick={closeMobileMenu}
            />


            <MobileNavItem
              to="/recommendations"
              label="Recommendations"
              icon={
                <Sparkles className="h-5 w-5" />
              }
              active={isActive("/recommendations")}
              onClick={closeMobileMenu}
            />


            <MobileNavItem
              to="/graph"
              label="Graph Explorer"
              icon={
                <Network className="h-5 w-5" />
              }
              active={isActive("/graph")}
              onClick={closeMobileMenu}
            />


            {/* MY ORDERS */}

            <MobileNavItem
              to="/orders"
              label="My Orders"
              icon={
                <ClipboardList className="h-5 w-5" />
              }
              active={isActive("/orders")}
              onClick={closeMobileMenu}
            />


            {/* PROFILE */}

            <MobileNavItem
              to="/profile"
              label="Profile"
              icon={
                <UserRound className="h-5 w-5" />
              }
              active={isActive("/profile")}
              onClick={closeMobileMenu}
            />


            {/* CART */}

            <MobileNavItem
              to="/cart"
              label={`Cart${
                cartCount > 0
                  ? ` (${cartCount})`
                  : ""
              }`}
              icon={
                <ShoppingBag className="h-5 w-5" />
              }
              active={isActive("/cart")}
              onClick={closeMobileMenu}
            />

          </nav>

        </div>

      )}

    </header>
  );
}


/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

function NavItem({
  to,
  label,
  icon,
  active,
}: {
  to:
    | "/"
    | "/explore"
    | "/recommendations"
    | "/graph"
    | "/orders";

  label: string;

  icon: React.ReactNode;

  active: boolean;
}) {

  return (
    <Link
      to={to}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-4
        py-2
        text-sm
        font-semibold
        transition-all
        duration-200

        ${
          active
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
        }
      `}
    >

      {icon}

      {label}

    </Link>
  );
}


/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileNavItem({
  to,
  label,
  icon,
  active,
  onClick,
}: {
  to:
    | "/"
    | "/explore"
    | "/recommendations"
    | "/graph"
    | "/orders"
    | "/profile"
    | "/cart";

  label: string;

  icon: React.ReactNode;

  active: boolean;

  onClick: () => void;
}) {

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex
        items-center
        gap-4
        rounded-2xl
        px-4
        py-3.5
        text-sm
        font-semibold
        transition-colors

        ${
          active
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-700 hover:bg-slate-50"
        }
      `}
    >

      <span
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl

          ${
            active
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >

        {icon}

      </span>


      {label}

    </Link>
  );
}


/* =========================================================
   FOOTER
========================================================= */

export function SiteFooter() {

  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

          {/* BRAND */}

          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">

                <Network className="h-4 w-4" />

              </div>


              <span className="text-xl font-bold tracking-tight text-slate-950">
                ShopGraph
              </span>

            </Link>


            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Shop smarter. Discover through connections.
            </p>

          </div>


          {/* LINKS */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">

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
              to="/orders"
              className="text-slate-500 transition-colors hover:text-indigo-600"
            >
              My Orders
            </Link>


            <Link
              to="/profile"
              className="text-slate-500 transition-colors hover:text-indigo-600"
            >
              Profile
            </Link>


            <Link
              to="/cart"
              className="text-slate-500 transition-colors hover:text-indigo-600"
            >
              Cart
            </Link>

          </div>

        </div>


        {/* COPYRIGHT */}

        <div className="mt-10 border-t border-slate-100 pt-6">

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ShopGraph. Shop smarter through connections.
          </p>

        </div>

      </div>

    </footer>
  );
}