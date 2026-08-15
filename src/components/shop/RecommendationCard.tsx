import { ArrowRight, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Recommendation } from "@/data/types";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onWhy: (recommendation: Recommendation) => void;
}

export function RecommendationCard({
  recommendation,
  onWhy,
}: RecommendationCardProps) {
  const { product } = recommendation;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="block"
      >
        <div className="relative overflow-hidden bg-surface">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-surface text-muted-foreground">
              No image
            </div>
          )}

          <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {recommendation.score}% match
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="eyebrow">{product.kind}</p>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-xl">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {recommendation.reason}
        </p>

        <button
          type="button"
          onClick={() => onWhy(recommendation)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          Why this product?
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}