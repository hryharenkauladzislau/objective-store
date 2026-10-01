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
  /** Дата появления в каталоге — для сортировки «новизна» (ТЗ §11) */
  addedAt: string;
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

/** Товар доступен к покупке: есть варианты «В наличии» или «Под заказ» */
function isAvailable(product: Product): boolean {
  const status = productStatus(product);
  return status === "in-stock" || status === "on-order";
}

/* ---------- Выборки (сейчас mock, позже fetch к API) ---------- */

export function getCategories(): Category[] {
  return categories;
}

/** Карусель на главной: только помеченные и доступные товары (ТЗ §9) */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featuredOnHome && isAvailable(p));
}

/**
 * «Актуальные предложения» на главной (ТЗ §8): доступные товары,
 * не пересекающиеся с каруселью, — новые поступления и ходовые позиции.
 */
export function getActualOffers(): Product[] {
  const carouselSlugs = new Set(getFeaturedProducts().map((p) => p.slug));
  return products.filter((p) => !carouselSlugs.has(p.slug) && isAvailable(p));
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
  return products.filter((p) => matchesQuery(p, q));
}

/* ---------- Запрос каталога с фильтрами и сортировкой (ТЗ §11) ---------- */

export type CatalogSort = "recommended" | "new" | "price-asc" | "price-desc";

export const CATALOG_SORTS: CatalogSort[] = [
  "recommended",
  "new",
  "price-asc",
  "price-desc",
];

export interface CatalogQuery {
  category?: CategorySlug;
  /** Модель, серия, цвет, артикул или ключевые слова */
  q?: string;
  storageGb?: number;
  color?: string;
  availability?: "in-stock" | "on-order";
  /** Верхняя граница цены «от», USD */
  maxPriceUsd?: number;
  sort?: CatalogSort;
}

function matchesQuery(product: Product, q: string): boolean {
  const haystack = [
    product.name,
    product.series,
    product.tagline,
    product.slug,
    ...product.variants.map((v) => `${v.sku} ${v.colorName}`),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

/** Фильтрация и сортировка каталога; sort по умолчанию — исходный порядок mock-данных */
export function queryProducts(query: CatalogQuery = {}): Product[] {
  let list = getProductsByCategory(query.category);

  const q = query.q?.trim().toLowerCase();
  if (q) list = list.filter((p) => matchesQuery(p, q));

  if (query.storageGb !== undefined) {
    list = list.filter((p) => p.variants.some((v) => v.storageGb === query.storageGb));
  }

  if (query.color) {
    const c = query.color.toLowerCase();
    list = list.filter((p) => p.variants.some((v) => v.colorName.toLowerCase() === c));
  }

  if (query.availability) list = list.filter((p) => productStatus(p) === query.availability);

  if (query.maxPriceUsd !== undefined) {
    const max = query.maxPriceUsd;
    list = list.filter((p) => {
      const price = productPriceFrom(p);
      return price !== null && price <= max;
    });
  }

  switch (query.sort) {
    case "new":
      list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
      break;
    case "price-asc":
      list.sort((a, b) => (productPriceFrom(a) ?? Infinity) - (productPriceFrom(b) ?? Infinity));
      break;
    case "price-desc":
      list.sort((a, b) => (productPriceFrom(b) ?? -Infinity) - (productPriceFrom(a) ?? -Infinity));
      break;
    default:
      break;
  }

  return list;
}
