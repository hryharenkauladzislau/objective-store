import { Container, SectionHeader } from "@/components/ui/primitives";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CatalogControls } from "@/components/catalog/CatalogControls";
import { Button } from "@/components/ui/Button";
import {
  CATALOG_SORTS,
  getCategories,
  getProductsByCategory,
  queryProducts,
  type CatalogQuery,
  type CategorySlug,
} from "@/lib/catalog";

/*
 * Каталог (ТЗ §11): поиск, фильтры (модель/память/цвет/состояние/наличие/цена),
 * сортировка — состояние в URL. Пустая выдача предлагает сброс фильтров
 * и вопрос менеджеру.
 */

const CATEGORY_SLUGS: CategorySlug[] = ["iphone", "mac", "ipad", "watch", "airpods", "accessories"];

export const metadata = { title: "Каталог" };

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const first = (key: string): string | undefined => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const category = CATEGORY_SLUGS.find((c) => c === first("category"));
  const sort = CATALOG_SORTS.find((s) => s === first("sort"));
  const storageGb = Number(first("storage"));
  const maxPriceUsd = Number(first("maxPrice"));

  const query: CatalogQuery = {
    category,
    q: first("q"),
    storageGb: Number.isFinite(storageGb) && storageGb > 0 ? storageGb : undefined,
    color: first("color"),
    availability:
      first("availability") === "in-stock" || first("availability") === "on-order"
        ? (first("availability") as "in-stock" | "on-order")
        : undefined,
    maxPriceUsd: Number.isFinite(maxPriceUsd) && maxPriceUsd > 0 ? maxPriceUsd : undefined,
    sort,
  };

  const products = queryProducts(query);

  /* Опции фильтров — внутри текущей категории, но до остальных фильтров */
  const pool = getProductsByCategory(category);
  const storages = [...new Set(pool.flatMap((p) => p.variants.map((v) => v.storageGb ?? -1)))]
    .filter((gb) => gb > 0)
    .sort((a, b) => a - b);
  const colors = [...new Set(pool.flatMap((p) => p.variants.map((v) => v.colorName)))].sort((a, b) =>
    a.localeCompare(b, "ru"),
  );

  const hasActiveFilters =
    Boolean(query.q || query.storageGb || query.color || query.availability || query.maxPriceUsd || sort);

  const hasJsFilters = Boolean(
    query.q || query.storageGb || query.color || query.availability || query.maxPriceUsd,
  );

  return (
    <Container className="py-10 lg:py-14">
      <SectionHeader
        title="Каталог"
        caption={`${products.length} ${plural(products.length)} · цены уточняются у менеджера`}
      />

      <div className="mt-8">
        <CatalogControls
          state={{
            q: query.q,
            storage: query.storageGb ? String(query.storageGb) : undefined,
            color: query.color,
            availability: query.availability,
            maxPrice: query.maxPriceUsd ? String(query.maxPriceUsd) : undefined,
            sort,
            focus: first("focus") !== undefined,
          }}
          storages={storages}
          colors={colors}
          hasActiveFilters={hasActiveFilters}
          chips={
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              <Chip href="/catalog" active={!category}>
                Все
              </Chip>
              {getCategories().map((c) => (
                <Chip key={c.slug} href={`/catalog?category=${c.slug}`} active={category === c.slug}>
                  {c.name}
                </Chip>
              ))}
            </div>
          }
        />
      </div>

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-card border border-line bg-surface p-8 text-center shadow-card">
          <p className="text-lg font-bold">Ничего не нашлось</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            {hasJsFilters
              ? "Попробуйте изменить или сбросить фильтры — либо спросите Евгения: подберёт вариант под запрос."
              : "В этой категории пока пусто. Спросите Евгения — подберёт вариант под запрос."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/catalog">Сбросить фильтры</Button>
            <Button href="/contacts?topic=question" variant="secondary">
              Задать вопрос
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: string }) {
  const cls = active
    ? "border-transparent bg-ink text-canvas"
    : "border-line bg-surface text-ink/80 hover:border-ink/25";
  return (
    <a
      href={href}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${cls}`}
    >
      {children}
    </a>
  );
}

function plural(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "модель";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "модели";
  return "моделей";
}
