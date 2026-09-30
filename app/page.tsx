import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getCategories, getFeaturedProducts, getUsedUnits } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

/*
 * Главная (ТЗ §8–10): первый экран с четырьмя сценариями, карусель
 * актуальных iPhone (этап 4), полоса доверия, категории, б/у, Trade-in,
 * как проходит покупка.
 */

const SCENARIOS = [
  {
    href: "/catalog",
    title: "Купить технику",
    text: "iPhone, Mac, iPad — новые, с гарантией",
    visual: "hero-visual-catalog" as const,
  },
  {
    href: "/trade-in",
    title: "Оценить устройство",
    text: "Trade-in: скидка за старое устройство",
    visual: "hero-visual-tradein" as const,
  },
  {
    href: "/used",
    title: "Смотреть б/у",
    text: "Проверенные устройства с паспортом",
    visual: "hero-visual-used" as const,
  },
  {
    href: "/contacts?topic=question",
    title: "Задать вопрос",
    text: "Ответим в Telegram за 10 минут",
    visual: "hero-visual-question" as const,
  },
];

const TRUST = [
  { title: "Гарантия магазина", text: "6–12 месяцев на новые и б/у" },
  { title: "Доставка сегодня", text: "По городу — в день заказа" },
  { title: "Помощь менеджера", text: "Подбор и проверка перед покупкой" },
  { title: "Trade-in", text: "Оценка старого устройства в зачёт" },
];

const STEPS = [
  {
    n: "01",
    title: "Выбор модели и параметров",
    text: "Находите модель в каталоге, выбираете память и цвет — цена и наличие обновляются сразу.",
  },
  {
    n: "02",
    title: "Уточнение цены и наличия",
    text: "Менеджер подтверждает актуальную цену, наличие и сроки — заявка уже содержит выбор.",
  },
  {
    n: "03",
    title: "Получение или доставка",
    text: "Забираете в точке продаж или оформляете доставку — проверка устройства при получении.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const used = getUsedUnits();
  const categories = getCategories();
  const hero = featured[0];

  return (
    <>
      {/* Первый экран: асимметрия, слева смысл и сценарии, справа товар */}
      <Container className="pb-14 pt-10 lg:pb-20 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight lg:text-[56px] lg:leading-[1.05]">
              Техника Apple
              <br />
              с понятной покупкой
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted lg:text-base">
              Актуальные iPhone, Mac и iPad, проверенные б/у устройства и Trade-in.
              Вы выбираете конфигурацию — менеджер подтверждает цену и наличие.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/catalog" size="lg">
                Перейти в каталог
              </Button>
              <Button href="/contacts?topic=availability" variant="secondary" size="lg">
                Уточнить наличие
              </Button>
            </div>

            {/* Четыре сценария — асимметричные плитки, не панель кнопок */}
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {SCENARIOS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex h-full flex-col rounded-card border border-line bg-surface p-4 transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card"
                  >
                    <span className="text-[15px] font-bold">{s.title}</span>
                    <span className="mt-1 text-sm leading-snug text-muted">{s.text}</span>
                    <span className="mt-3 text-sm font-semibold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Перейти →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Крупное предметное фото флагмана */}
          {hero ? (
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-block border border-line bg-surface shadow-card lg:aspect-[5/6]">
                <Image
                  src={hero.variants[0]?.images[0] ?? ""}
                  alt={hero.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  data-boot-critical="true"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-surface/95 p-4 shadow-pop backdrop-blur">
                <div>
                  <p className="text-sm font-bold">{hero.name}</p>
                  <p className="text-xs text-muted">{hero.tagline}</p>
                </div>
                <span className="shrink-0 text-sm font-bold tabular-nums text-accent">в наличии</span>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      {/* Полоса доверия */}
      <section className="border-y border-line bg-surface">
        <Container>
          <ul className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {TRUST.map((item) => (
              <li key={item.title} className="px-2 py-5 lg:px-6">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Актуальные iPhone — первые 8 из карусели (полная карусель на этапе 4) */}
      <Container className="py-14 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Актуальные iPhone</h2>
          <Link href="/catalog?category=iphone" className="shrink-0 text-sm font-semibold text-accent hover:text-accent-strong">
            Все модели →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      </Container>

      {/* Категории — редакционная сетка (полная журнальная раскладка на этапе 5) */}
      <section className="border-t border-line bg-surface py-14 lg:py-20">
        <Container>
          <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Категории</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog?category=${c.slug}`}
                  className="group flex h-full items-end justify-between rounded-card border border-line bg-canvas p-5 transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div>
                    <span className="text-lg font-bold">{c.name}</span>
                    <p className="mt-1 max-w-[220px] text-sm text-muted">{c.caption}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-xs font-bold tabular-nums text-muted/60"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Проверенные б/у устройства */}
      <Container className="py-14 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Проверенные б/у</h2>
            <p className="mt-1.5 text-sm text-muted">Паспорт экземпляра: состояние, аккумулятор, комплект</p>
          </div>
          <Link href="/used" className="shrink-0 text-sm font-semibold text-accent hover:text-accent-strong">
            Все б/у →
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {used.map((u) => (
            <li key={u.id} className="flex flex-col rounded-card border border-line bg-surface shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[15px]">
                <Image src={u.images[0] ?? ""} alt={u.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">
                    {u.name} · {u.storageGb} ГБ
                  </h3>
                  <span className="text-[15px] font-bold tabular-nums">{formatPrice(u.priceUsd)}</span>
                </div>
                <p className="text-sm text-muted">{u.conditionNote}</p>
                <dl className="mt-auto space-y-1 pt-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Аккумулятор</dt>
                    <dd className="font-semibold tabular-nums">{u.batteryHealth}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Комплект</dt>
                    <dd className="font-medium">{u.kit.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Гарантия</dt>
                    <dd className="font-medium">{u.warrantyMonths} мес.</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* Trade-in */}
      <section className="border-t border-line bg-surface py-14 lg:py-20">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Trade-in</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                Сдайте старое устройство в зачёт нового. Менеджер оценивает по состоянию
                и подтверждает сумму после осмотра.
              </p>
              <Button href="/trade-in" size="lg" className="mt-6">
                Начать оценку
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Устройство", "Модель", "Состояние"].map((label, i) => (
                <div key={label} className="rounded-card border border-line bg-canvas p-4">
                  <span className="text-xs font-bold tabular-nums text-muted">0{i + 1}</span>
                  <p className="mt-2 text-sm font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Как проходит покупка */}
      <Container className="py-14 lg:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Как проходит покупка</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="rounded-card border border-line bg-surface p-6 shadow-card">
              <span className="text-xs font-bold tabular-nums text-accent">{step.n}</span>
              <h3 className="mt-2 font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
