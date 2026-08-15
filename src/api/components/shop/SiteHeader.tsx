import { Link } from "@tanstack/react-router";
import { Compass, Heart, Home, Network, Search, ShoppingBag, Sparkles, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/recommendations", label: "Recommendations", icon: Sparkles },
  { to: "/activity", label: "My Activity", icon: Heart },
  { to: "/graph", label: "Graph Explorer", icon: Network },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Network className="h-4 w-4 text-primary-foreground" aria-hidden />
            </span>
            <span className="font-display text-xl">ShopGraph</span>
          </Link>

          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Link
              to="/explore"
              aria-label="Search products"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden />
            </Link>
            <Link
              to="/activity"
              aria-label="Wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            >
              <Heart className="h-[18px] w-[18px]" aria-hidden />
            </Link>
            <Link
              to="/dashboard"
              aria-label="Cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="h-[18px] w-[18px]" aria-hidden />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
            </Link>
            <Link
              to="/profile"
              aria-label="Profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
            >
              VK
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-6 border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground transition-colors data-[status=active]:text-foreground"
          >
            <item.icon className="h-[18px] w-[18px]" aria-hidden />
            {item.label.replace("My ", "").replace(" Explorer", "")}
          </Link>
        ))}
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border py-10 pb-28 lg:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <span className="font-display text-base text-foreground">ShopGraph</span>
        <p>Recommendations are based on relationships, not guesswork.</p>
      </div>
    </footer>
  );
}
