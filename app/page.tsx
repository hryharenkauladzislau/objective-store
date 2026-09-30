import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel";
import { FounderTrustBlock } from "@/components/founder/FounderTrustBlock";
import { getCategories, getFeaturedProducts, getUsedUnits } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { SITE } from "@/lib/site";

/*
 * Главная (ТЗ §8–10): первый экран с личным брендом владельца и четырьмя
 * сценариями, карусель актуальных iPhone, полоса доверия, категории,
 * б/у, личный блок доверия, Trade-in, как проходит покупка.
 */

const SCENARIOS = [
  {
    href: "/catalog",
    title: "Купить технику",
    text: "iPhone, Mac, iPad — новые, с гарантией",
  },
  {
    href: "/trade-in",
    title: "Оценить устройство",
    text: "Trade-in: скидка за старое устройство",
  },
  {
    href: "/used",
    title: "Смотреть б/у",
    text: "Проверенные устройства с паспортом",
  },
  {
    href: "/contacts?topic=question",
    title: "Задать вопрос",
    text: "Отвечает лично Евгений",
  },
];

const TRUST = [
  { title: "Гарантия магазина", text: "6–12 месяцев на новые и б/у" },
  { title: "Доставка по Минску", text: "Сегодня при заказе до 18:00" },
  { title: "Помощь Евгения", text: "Подбор и проверка перед покупкой" },
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
    text: "Евгений подтверждает актуальную цену, наличие и сроки — заявка уже содержит выбор.",
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

  return (
    <>
      {/* Первый экран: слева смысл и сценарии, справа — фото владельца в композиции */}
      <Container className="pb-12 pt-8 lg:pb-16 lg:pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-accent">Техника Apple в {SITE.city}</p>
            <h1 className="mt-3 text-[34px] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[52px] lg:leading-[1.05]">
              Помогу выбрать технику, которая действительно вам подходит
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted lg:text-base">
              Каталог актуальных устройств, консультация перед покупкой и помощь после неё.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/catalog" size="lg">
                Смотреть каталог
              </Button>
              <Button href="/contacts?topic=question" variant="secondary" size="lg">
                Задать вопрос Евгению
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted">
              На связи лично — без операторов и шаблонных ответов
            </p>

            {/* Четыре сценария — асимметричные плитки, не панель кнопок */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
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

          {/* Фотография владельца как часть композиции: спокойная зелёная форма
              за фото и тонкий золотой акцент; без рамок-баннеров.
              На mobile идёт после текста и не выше ~40% первого экрана. */}
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-4 bottom-10 rounded-block bg-tint lg:inset-x-10 lg:top-10"
            />
            <div
              aria-hidden="true"
              className="absolute right-8 top-6 hidden h-2 w-14 rounded-full bg-signal/60 sm:block lg:right-16 lg:top-14"
            />
            <div className="relative aspect-[4/3.2] overflow-hidden rounded-b-block rounded-t-[999px] sm:aspect-[4/4.9]">
              <Image
                src="/images/evgeniy-founder.webp"
                alt="Евгений — основатель магазина EVGENIY APPLE"
                fill
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 440px, 560px"
                className="object-cover object-[68%_30%] sm:object-[66%_28%] lg:object-[62%_26%]"
              />
            </div>
          </div>
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

      {/* Карусель актуальных iPhone (ТЗ §9) */}
      <section className="overflow-hidden py-14 lg:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Актуальные iPhone</h2>
              <p className="mt-1.5 text-sm text-muted">Наведите — лента остановится. Полный выбор в каталоге.</p>
            </div>
            <Link href="/catalog?category=iphone" className="shrink-0 text-sm font-semibold text-accent hover:text-accent-strong">
              Все модели →
            </Link>
          </div>
        </Container>
        <div className="mt-8">
          <FeaturedCarousel products={featured} />
        </div>
      </section>

      {/* Личный блок доверия владельца */}
      <FounderTrustBlock />

      {/* Категории — редакционная сетка */}
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
                  <span aria-hidden="true" className="text-xs font-bold tabular-nums text-muted/60">
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
                Сдайте старое устройство в зачёт нового. Евгений оценивает по состоянию
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
