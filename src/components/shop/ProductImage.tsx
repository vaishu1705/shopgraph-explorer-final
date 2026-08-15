import type { CSSProperties } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className = "",
  style,
  priority = false,
}: ProductImageProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-muted ${className}`}
      style={style}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-muted-foreground">
          No image available
        </div>
      )}
    </div>
  );
}