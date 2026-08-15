import { Link } from "@tanstack/react-router";
import { Sparkles, Star } from "lucide-react";
import { brandName } from "@/data/mockData";
import type { Recommendation } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";

export function RecommendationCard({
  recommendation,
  onWhy,
}: {
  recommendation: Recommendation;
  onWhy: (rec: Recommendation) => void;
}) {
  const { product, score, reason } = recommendation;

  return (
    <article className="card-surface flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift">
      <div className="relative bg-surface">
        <Link to="/products/$productId" params={{ productId: product.id }}>
          <ProductImage src={product.image} alt={product.name} />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
          {score}% Match
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-sans text-base leading-snug font-semibold tracking-normal">
          <Link to="/products/$productId" params={{ productId: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{brandName(product.brandId)}</p>
        <div className="flex items-center justify-between">
          <p className="font-display text-xl">{formatPrice(product.price)}</p>
          <span className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{reason}</p>
        <button
          type="button"
          onClick={() => onWhy(recommendation)}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" aria-hidden /> Why recommended
        </button>
      </div>
    </article>
  );
}
