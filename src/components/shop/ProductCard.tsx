import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/data/types";
import { brandName, categoryName } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="group flex h-full flex-col"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">

        {/* Image */}

        <div className="relative overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating */}

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-semibold shadow-sm">
            <Star
              className="h-3.5 w-3.5 fill-current"
              aria-hidden
            />
            {product.rating.toFixed(1)}
          </div>
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col p-5">

          <p className="eyebrow">
            {brandName(product.brandId)}
          </p>

          <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {categoryName(product.categoryId)}
          </p>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-5">

            <div>
              <p className="text-lg font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {product.reviews.toLocaleString("en-IN")} reviews
              </p>
            </div>

            <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors group-hover:bg-foreground group-hover:text-background">
              View
            </span>

          </div>

        </div>
      </article>
    </Link>
  );
}