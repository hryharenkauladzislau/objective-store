import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel";
import { PhoneLink, SocialLink } from "@/components/layout/ContactLinks";
import type { Product } from "@/lib/catalog";
import {
  formatPrice,
  getActualOffers,
  getCategories,
  getFeaturedProducts,
  getUsedUnits,
  productPriceFrom,
} from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const metadata = {
  title: { absolute: "EVGENIY APPLE — техника Apple в Минске" },
  description:
    "Актуальные iPhone, Mac, iPad и Watch в Минске. Проверенные б/у с паспортом, Trade-in, гарантия магазина. Цены и наличие подтверждает лично Евгений.",
};

/*
 * Главная по актуальной ревизии ТЗ §8–10: карусель — первый экран, далее
 * категории, полоса доверия, б/у, Trade-in, актуальные предложения,
 * покупка/доставка/оплата/цена, гарантия, ремонт, обо мне (фото владельца —
 * только здесь), факты, контакты, FAQ. Текстовый hero удалён.
 */

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

const FACTS = [
  { title: "Проверка каждого устройства", text: "Диагностика до продажи и паспорт для б/у" },
  { title: "Честные цены", text: "Итоговая сумма подтверждается до оплаты" },
  { title: "Поддержка после покупки", text: "Помощь с настройкой и переносом данных" },
  { title: "Один владелец", text: "Отвечает лично Евгений — без операторов" },
];

/* Полоса фактов после «Обо мне» — короткие причины доверять, без повторов */
const QUICK_FACTS = [
  { title: "Паспорт для б/у", text: "Аккумулятор, комплект и дефекты — всё открыто" },
  { title: "Проверка при получении", text: "Осмотр устройства на месте или при доставке" },
  { title: "Обмен по гарантии", text: "Без споров — вопрос решает Евгений лично" },
  { title: "Trade-in в зачёт", text: "Старое устройство снижает цену нового" },
];

const FAQ = [
  {
    q: "Как узнать актуальную цену и наличие?",
    a: "Цены в каталоге округлены и могут отличаться от курса на день покупки. Евгений подтверждает итоговую сумму и наличие перед оплатой.",
  },
  {
    q: "Можно ли сдать старое устройство?",
    a: "Да, работает Trade-in: старое устройство идёт в зачёт нового. Сумма оценивается по состоянию после осмотра.",
  },
  {
    q: "Какая гарантия на устройства?",
    a: "Новые устройства — гарантия магазина, б/у — 6–12 месяцев в зависимости от экземпляра. Условия — в разделе «Гарантия».",
  },
  {
    q: "Есть ли доставка по Минску?",
    a: "Да, при заказе до 18:00 доставка в день заказа. Устройство можно проверить при получении.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const actualOffers = getActualOffers();
  const used = getUsedUnits();
  const categories = getCategories();

  return (
    <>
      {/* Карусель — первый контентный блок после шапки (ТЗ §9) */}
      <section className="overflow-hidden py-10 lg:py-14">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Актуальные iPhone</h1>
              <p className="mt-1.5 text-sm text-muted">Наведите — лента остановится. Полный выбор в каталоге.</p>
            </div>
            <Button href="/catalog" size="sm" className="shrink-0">
              Каталог
            </Button>
          </div>
        </Container>
        <div className="mt-8">
          <FeaturedCarousel products={featured} />
        </div>
      </section>

      {/* Категории — редакционная сетка (ТЗ §8) */}
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

      {/* Полоса доверия */}
      <section className="border-b border-line bg-surface">
        <Container>
          <ul className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {TRUST.map((item) => (
              <li key={item.title} className="border-t border-line px-2 py-5 sm:border-t-0 lg:px-6">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
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
      <section className="border-y border-line bg-surface py-14 lg:py-20">
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

      {/* Актуальные предложения — без пересечения с каруселью (ТЗ §8) */}
      {actualOffers.length > 0 ? (
        <Container className="py-14 lg:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Актуальные предложения</h2>
              <p className="mt-1.5 text-sm text-muted">Новые поступления и ходовые позиции — тоже в наличии</p>
            </div>
            <Link href="/catalog" className="shrink-0 text-sm font-semibold text-accent hover:text-accent-strong">
              Весь каталог →
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {actualOffers.slice(0, 8).map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/catalog/${product.slug}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-surface p-4 transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="font-bold leading-snug">{product.name}</span>
                  <span className="mt-1 line-clamp-2 text-sm leading-snug text-muted">{product.tagline}</span>
                  <span className="mt-auto pt-3 text-[15px] font-bold tabular-nums text-accent">
                    {priceFromLabel(product)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Покупка, доставка, оплата, цена */}
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
        <p className="mt-6 text-sm text-muted">
          Оплата: наличными, картой или переводом. Доставка по Минску — в день заказа
          при оформлении до 18:00. Итоговая цена подтверждается Евгением перед покупкой.
        </p>
      </Container>

      {/* Гарантия */}
      <section className="border-t border-line bg-surface py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Гарантия</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              На новые устройства — гарантия магазина. На проверенные б/у — 6–12 месяцев
              в зависимости от экземпляра. Обмен и диагностика — без споров и переписки:
              вопрос решает Евгений лично.
            </p>
            <Button href="/warranty" variant="secondary" className="mt-6">
              Подробнее о гарантии
            </Button>
          </div>
        </Container>
      </section>

      {/* Ремонт и обслуживание */}
      <Container className="py-14 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Ремонт и обслуживание</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Диагностика, замена аккумулятора и дисплея, настройка и перенос данных.
            Сначала оценка, потом работа — стоимость согласуется заранее.
          </p>
          <Button href="/repair" variant="secondary" className="mt-6">
            Услуги ремонта
          </Button>
        </div>
      </Container>

      {/* Обо мне — единственное место с фото владельца (ТЗ §8) */}
      <section id="about" className="border-y border-line bg-surface py-14 lg:py-20">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
              <div className="relative aspect-[4/4.9] overflow-hidden rounded-b-card rounded-t-[999px]">
                <Image
                  src="/images/evgeniy-founder.webp"
                  alt="Евгений — основатель магазина EVGENIY APPLE"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[62%_26%]"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Обо мне</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Я — Евгений, владелец магазина техники Apple в Минске. Сам подбираю
                устройства, проверяю их перед продажей и остаюсь на связи после покупки:
                подсказать, настроить, обменять по гарантии.
              </p>
              <ul className="mt-6 space-y-3">
                {FACTS.map((fact) => (
                  <li key={fact.title} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <p className="text-sm leading-relaxed">
                      <span className="font-bold">{fact.title}.</span>{" "}
                      <span className="text-muted">{fact.text}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <Button href="/contacts?topic=question" variant="secondary" className="mt-8">
                Задать вопрос
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Факты — короткие причины доверять */}
      <Container className="py-14 lg:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_FACTS.map((fact) => (
            <li key={fact.title} className="rounded-card border border-line bg-surface p-5 shadow-card">
              <p className="font-bold">{fact.title}</p>
              <p className="mt-1.5 text-sm leading-snug text-muted">{fact.text}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Контакты и соцсети (ТЗ §24: плейсхолдеры из lib/site.ts) */}
      <section className="border-t border-line bg-surface py-14 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Контакты</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                Напишите или позвоните — отвечаю лично. Наличие, цена и сроки
                подтверждаются перед покупкой.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
                <PhoneLink />
                <SocialLink network="telegram" />
                <SocialLink network="instagram" />
              </div>
              <Button href="/contacts" variant="secondary" className="mt-6">
                Все контакты
              </Button>
            </div>
            <div className="rounded-card border border-line bg-canvas p-6">
              <p className="text-sm font-bold">Где забрать</p>
              <p className="mt-1.5 text-sm text-muted">
                {SITE.city} — точка продаж и выдачи. Адрес и график появятся здесь
                после подтверждения данных владельцем.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Container className="py-14 lg:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Частые вопросы</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {FAQ.map((item) => (
            <li key={item.q} className="rounded-card border border-line bg-surface p-6 shadow-card">
              <p className="font-bold">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Остались вопросы?{" "}
          <Link href="/faq" className="font-semibold text-accent hover:text-accent-strong">
            Смотреть все вопросы →
          </Link>
        </p>
      </Container>
    </>
  );
}

/** Цена «от» карточки актуального предложения (ТЗ §13) */
function priceFromLabel(product: Product): string {
  const price = productPriceFrom(product);
  return price !== null ? `от ${formatPrice(price)}` : "Цена по запросу";
}
