import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

/** Square product image with graceful fallback if the asset ever fails. */
export function ProductImage({ src, alt, className, eager = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex aspect-square w-full items-center justify-center bg-muted text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="h-6 w-6" aria-hidden />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={cn("aspect-square w-full object-cover", className)}
    />
  );
}
