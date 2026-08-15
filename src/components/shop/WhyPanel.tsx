import { X, ArrowRight } from "lucide-react";
import type { Recommendation } from "@/data/types";

interface WhyPanelProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export function WhyPanel({
  recommendation,
  onClose,
}: WhyPanelProps) {
  if (!recommendation) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-float">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow text-accent">Explainable recommendation</p>
            <h2 className="mt-1 text-xl font-semibold">
              Why this product?
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {recommendation.product.image && (
              <img
                src={recommendation.product.image}
                alt={recommendation.product.name}
                className="aspect-video w-full object-cover"
              />
            )}

            <div className="p-5">
              <h3 className="text-xl font-semibold">
                {recommendation.product.name}
              </h3>

              <div className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1.5 text-sm font-bold text-accent">
                {recommendation.score}% match
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="eyebrow">Reason</p>

            <p className="mt-3 text-lg leading-relaxed">
              {recommendation.reason}
            </p>
          </div>

          <div className="mt-8">
            <p className="eyebrow">Connection path</p>

            <div className="mt-4 space-y-2">
              {recommendation.path.map((step, index) => (
                <div key={`${step.label}-${index}`}>
                  <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">
                    {step.label}
                  </div>

                  {index < recommendation.path.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="h-4 w-4 rotate-90 text-accent" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}