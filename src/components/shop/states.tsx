import type { ReactNode } from "react";
import { AlertCircle, PackageSearch } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon ?? (
          <PackageSearch className="h-5 w-5" />
        )}
      </div>

      <h2 className="mt-5 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertCircle
          className="h-5 w-5"
          aria-hidden
        />
      </div>

      <h2 className="mt-5 text-xl font-semibold">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We couldn't load the products. Please try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[1.5rem] border border-border bg-card"
        >
          <div className="aspect-square animate-pulse bg-muted" />

          <div className="space-y-3 p-5">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />

            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

            <div className="h-4 w-full animate-pulse rounded bg-muted" />

            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Skeleton used by Activity and other list-based pages */
export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />

        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>

      <div className="h-4 w-16 animate-pulse rounded bg-muted" />
    </div>
  );
}