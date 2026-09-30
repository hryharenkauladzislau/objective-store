"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatPrice, productPriceFrom, productStatus } from "@/lib/catalog";
import { StatusBadge } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/*
 * Карусель актуальных iPhone (ТЗ §9):
 * - desktop: плавное непрерывное движение, при наведении лента останавливается;
 * - активная карточка под курсором увеличивается на 4–6%;
 * - mobile: ручной свайп со snap, автодвижение отключено;
 * - после первого взаимодействия автодвижение останавливается;
 * - при prefers-reduced-motion бесконечное движение отключено;
 * - карточка: изображение, модель, цена «от», цвета, статус, кнопка «Выбрать».
 */

const SPEED_PX_PER_S = 42;

export function FeaturedCarousel({ products }: { products: Product[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [halfWidth, setHalfWidth] = useState<number | null>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Системные настройки через события, без setState в теле эффекта */
  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      setReducedMotion(mqMotion.matches);
      setIsMobile(mqMobile.matches);
    };
    sync();
    mqMotion.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqMotion.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  /* Замер половины трека для бесшовного цикла */
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setHalfWidth(trackRef.current.scrollWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products]);

  /* Плавное непрерывное движение ленты (desktop, без interaction) */
  useEffect(() => {
    if (reducedMotion || isMobile || userInteracted || halfWidth === null) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        offsetRef.current = (offsetRef.current + SPEED_PX_PER_S * dt) % halfWidth;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, isMobile, userInteracted, halfWidth]);

  const autoMoving = !reducedMotion && !isMobile && !userInteracted;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        setHovered(null);
      }}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className={cn(
            "flex w-max gap-4 px-6",
            !autoMoving && "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            isMobile && "snap-x snap-mandatory",
          )}
          onPointerDown={() => setUserInteracted(true)}
          onWheel={() => setUserInteracted(true)}
          onTouchStart={() => setUserInteracted(true)}
          style={
            autoMoving && halfWidth !== null
              ? { width: "max-content" }
              : undefined
          }
        >
          {/* Дублируем ленту для бесшовного цикла только в режиме автодвижения */}
          {(autoMoving ? [...products, ...products] : products).map((product, i) => (
            <CarouselCard
              key={`${product.slug}-${i}`}
              product={product}
              active={hovered === `${product.slug}-${i}`}
              onHover={() => setHovered(`${product.slug}-${i}`)}
              compact={!autoMoving && isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselCard({
  product,
  active,
  onHover,
  compact,
}: {
  product: Product;
  active: boolean;
  onHover: () => void;
  compact: boolean;
}) {
  const price = productPriceFrom(product);
  const status = productStatus(product);
  const colors = new Map<string, string>();
  for (const v of product.variants) {
    if (!colors.has(v.colorName)) colors.set(v.colorName, v.colorHex);
  }

  return (
    <article
      onMouseEnter={onHover}
      className={cn(
        "group flex shrink-0 snap-center flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-transform duration-300 ease-out-soft",
        compact ? "w-[240px]" : "w-[280px]",
        // Активная карточка увеличивается на ~5% (ТЗ §9)
        active ? "scale-[1.05]" : "scale-100",
      )}
    >
      <Link href={`/catalog/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-canvas">
        <Image
          src={product.variants[0]?.images[0] ?? ""}
          alt={product.name}
          fill
          sizes="280px"
          className="object-cover"
        />
        <StatusBadge status={status} className="absolute left-3 top-3" />
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-bold leading-snug">{product.name}</h3>
        <p className="text-sm leading-snug text-muted">{product.tagline}</p>

        <div className="mt-2 flex items-center gap-1.5" aria-label="Доступные цвета">
          {[...colors.values()].slice(0, 5).map((hex) => (
            <span
              key={hex}
              className="h-3 w-3 rounded-full border border-ink/10"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[15px] font-bold tabular-nums">
            {price !== null ? `от ${formatPrice(price)}` : "Цена по запросу"}
          </span>
          <Link
            href={`/catalog/${product.slug}`}
            className="rounded-full bg-tint px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Выбрать
          </Link>
        </div>
      </div>
    </article>
  );
}
