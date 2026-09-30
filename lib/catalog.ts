/*
 * Слой данных витрины.
 *
 * Сейчас данные отдаются из mock-файла (lib/mock/catalog.ts), но интерфейсы
 * повторяют будущую схему БД из ТЗ: Category → Product → Variant (+ UsedUnit).
 * Когда появится PostgreSQL и общий API (сайт + Telegram Mini App),
 * функции этого файла заменяются на fetch к API без изменения UI.
 */

import { categories, products, usedUnits } from "@/lib/mock/catalog";

export type ProductStatus = "in-stock" | "on-order" | "out" | "request";

export type CategorySlug =
  | "iphone"
  | "mac"
  | "ipad"
  | "watch"
  | "airpods"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Описание для редакционной сетки на главной */
  caption: string;
}

export interface Variant {
  /** Уникальный SKU варианта — по нему в будущем работает Excel-импорт (ТЗ §19) */
  sku: string;
  storageGb: number | null;
  /** HEX цвета варианта */
  colorHex: string;
  colorName: string;
  /** SIM / региональная версия */
  sim: string;
  /** Базовая цена USD до коэффициента (ТЗ §13) */
  basePriceUsd: number;
  /** Ручной override отображаемой цены; иначе считается от базовой */
  manualPriceUsd: number | null;
  status: ProductStatus;
  images: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  series: string;
  tagline: string;
  /** Флаг «Показывать на главной» для карусели (ТЗ §9) */
  featuredOnHome: boolean;
  specs: ProductSpec[];
  variants: Variant[];
}

export interface UsedUnit {
  /** ID физического экземпляра (ТЗ §14) */
  id: string;
  slug: string;
  name: string;
  storageGb: number;
  colorName: string;
  condition: "excellent" | "good" | "fair";
  conditionNote: string;
  batteryHealth: number;
  batteryReplaced: boolean;
  kit: string[];
  checks: string[];
  defects: string | null;
  /** Гарантия магазина */
  warrantyMonths: number;
  priceUsd: number;
  images: string[];
}

/* ---------- Формирование цен (ТЗ §13) ---------- */

/** Валюта отображения. TODO: коэффициент и округление брать из SiteSetting. */
export function formatPrice(usd: number): string {
  const rounded = Math.round(usd / 10) * 10;
  return `$${rounded.toLocaleString("ru-RU")}`;
}

export function variantPrice(variant: Variant): number {
  return variant.manualPriceUsd ?? variant.basePriceUsd;
}

/** Цена карточки = минимальная цена доступных вариантов («цена от», ТЗ §13) */
export function productPriceFrom(product: Product): number | null {
  const available = product.variants.filter(
    (v) => v.status === "in-stock" || v.status === "on-order",
  );
  const pool = available.length > 0 ? available : product.variants;
  if (pool.length === 0) return null;
  return Math.min(...pool.map(variantPrice));
}

export function productStatus(product: Product): ProductStatus {
  if (product.variants.some((v) => v.status === "in-stock")) return "in-stock";
  if (product.variants.some((v) => v.status === "on-order")) return "on-order";
  return "out";
}

/* ---------- Выборки (сейчас mock, позже fetch к API) ---------- */

export function getCategories(): Category[] {
  return categories;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featuredOnHome);
}

export function getProductsByCategory(category?: CategorySlug): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getUsedUnits(): UsedUnit[] {
  return usedUnits;
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.series.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q),
  );
}
