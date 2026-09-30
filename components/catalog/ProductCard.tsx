import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatPrice, productPriceFrom, productStatus } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/primitives";

/*
 * Товарная карточка каталога и карусели (ТЗ §11): изображение, модель,
 * цена «от», доступные цвета, статус и кнопка «Выбрать».
 */
export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const price = productPriceFrom(product);
  const status = productStatus(product);
  // Уникальные цвета варианта для точек выбора
  const seenColors = new Map<string, string>();
  for (const v of product.variants) {
    if (!seenColors.has(v.colorName)) seenColors.set(v.colorName, v.colorHex);
  }

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-pop",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
        <Image
          src={product.variants[0]?.images[0] ?? ""}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
          priority={priority}
        />
        <StatusBadge status={status} className="absolute left-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold leading-snug">{product.name}</h3>
        <p className="text-sm leading-snug text-muted">{product.tagline}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {[...seenColors.values()].slice(0, 5).map((hex) => (
              <span
                key={hex}
                className="h-3 w-3 rounded-full border border-ink/10"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
          <span className="text-[15px] font-bold tabular-nums">
            {price !== null ? `от ${formatPrice(price)}` : "Цена по запросу"}
          </span>
        </div>
      </div>
    </Link>
  );
}
