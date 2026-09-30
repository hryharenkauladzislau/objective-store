import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, StatusBadge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { formatPrice, getProductBySlug, productPriceFrom, productStatus } from "@/lib/catalog";

/*
 * Карточка товара (ТЗ §12). На этом этапе — статичный каркас с галереей,
 * характеристиками и CTA. Конфигуратор памяти/цвета добавляется на
 * отдельном этапе.
 */
export function generateStaticParams() {
  // Динамический маршрут на mock-данных; при переходе на API меняется на асинхронный fetch
  return [];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const price = productPriceFrom(product);
  const status = productStatus(product);
  const images = product.variants[0]?.images ?? [];

  return (
    <Container className="py-8 lg:py-12">
      <nav aria-label="Хлебные крошки" className="text-sm text-muted">
        <Link href="/catalog" className="hover:text-ink">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/catalog?category=${product.category}`} className="hover:text-ink">
          {product.series}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-block border border-line bg-surface">
          <div className="relative aspect-square">
            <Image
              src={images[0] ?? ""}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2 border-t border-line p-2">
            {images.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-canvas">
                <Image src={src} alt={`${product.name} — фото ${i + 1}`} fill sizes="15vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={status} />
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight lg:text-4xl">{product.name}</h1>
          <p className="mt-2 text-[15px] text-muted">{product.tagline}</p>

          <p className="mt-6 text-3xl font-extrabold tabular-nums">
            {price !== null ? `от ${formatPrice(price)}` : "Цена по запросу"}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contacts?topic=availability" size="lg">
              Уточнить наличие
            </Button>
            <Button href="/compare" variant="secondary" size="lg">
              В сравнение
            </Button>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold">Характеристики</h2>
            <dl className="mt-4 divide-y divide-line rounded-card border border-line bg-surface px-5">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-start justify-between gap-6 py-3.5">
                  <dt className="text-sm text-muted">{spec.label}</dt>
                  <dd className="text-right text-sm font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Container>
  );
}
