import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Примитивы дизайн-системы витрины.
 * Правила ТЗ: радиусы 16px у карточек, капсулы только у кнопок/тегов,
 * тени минимальные, границы тонкие.
 */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "signal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-3 text-xs font-semibold",
        tone === "neutral" && "border-line bg-surface text-muted",
        tone === "accent" && "border-transparent bg-tint text-accent",
        tone === "signal" && "border-transparent bg-signal-tint text-signal-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export type ProductStatus = "in-stock" | "on-order" | "out" | "request";

const STATUS_META: Record<ProductStatus, { label: string; className: string }> = {
  "in-stock": { label: "В наличии", className: "bg-tint text-accent" },
  "on-order": { label: "Под заказ", className: "bg-signal-tint text-signal-ink" },
  out: { label: "Нет в наличии", className: "bg-ink/5 text-muted" },
  request: { label: "Цена по запросу", className: "bg-ink/5 text-muted" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        meta.className,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-card bg-ink/5", className)} />;
}

export function SectionHeader({
  title,
  caption,
  href,
  hrefLabel,
}: {
  title: string;
  caption?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">{title}</h2>
        {caption ? <p className="mt-1.5 text-sm text-muted">{caption}</p> : null}
      </div>
      {href && hrefLabel ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
        >
          {hrefLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export function Price({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("tabular-nums", className)}>{children}</span>;
}
