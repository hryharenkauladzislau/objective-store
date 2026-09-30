import { Container, SectionHeader } from "@/components/ui/primitives";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getProductsByCategory } from "@/lib/catalog";

/*
 * Каталог (ТЗ §11). На этом этапе — базовая сетка товаров по категории.
 * Поиск, фильтры, сортировка и URL-состояние добавляются на отдельном этапе.
 */
export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = getProductsByCategory(
    category === "iphone" ||
      category === "mac" ||
      category === "ipad" ||
      category === "watch" ||
      category === "airpods" ||
      category === "accessories"
      ? category
      : undefined,
  );

  return (
    <Container className="py-10 lg:py-14">
      <SectionHeader
        title="Каталог"
        caption={`${products.length} моделей · цены уточняются у менеджера`}
      />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.slug} product={product} priority={i < 4} />
        ))}
      </div>
    </Container>
  );
}
