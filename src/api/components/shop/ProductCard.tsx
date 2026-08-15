import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { brandName, categoryName } from "@/data/mockData";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article className="card-surface group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift">
      <div className="relative bg-surface">
        <Link to="/products/$productId" params={{ productId: product.id }} aria-label={product.name}>
          <ProductImage
            src={product.image}
            alt={product.name}
            eager={eager}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur transition-colors hover:border-accent"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wishlisted ? "fill-accent text-accent" : "text-muted-foreground",
            )}
            aria-hidden
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="eyebrow">{categoryName(product.categoryId)}</span>
        <h3 className="font-sans text-base leading-snug font-semibold tracking-normal">
          <Link to="/products/$productId" params={{ productId: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{brandName(product.brandId)}</p>

        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({product.reviews.toLocaleString("en-IN")})</span>
        </div>

        <p className="mt-1 font-display text-xl">{formatPrice(product.price)}</p>

        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="mt-auto inline-flex items-center justify-center rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View Product
        </Link>
      </div>
    </article>
  );
}
