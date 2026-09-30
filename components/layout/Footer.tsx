import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/primitives";

/*
 * Footer по ТЗ §10: категории, доставка и оплата, гарантия, Trade-in, контакты,
 * адрес, график, юридические ссылки.
 * TODO: заменить все контакты, адрес, график и юрданные на данные заказчика.
 */

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Каталог",
    links: [
      { href: "/catalog?category=iphone", label: "iPhone" },
      { href: "/catalog?category=mac", label: "Mac" },
      { href: "/catalog?category=ipad", label: "iPad" },
      { href: "/catalog?category=watch", label: "Apple Watch" },
      { href: "/catalog?category=airpods", label: "AirPods" },
      { href: "/catalog?category=accessories", label: "Аксессуары" },
    ],
  },
  {
    title: "Покупателям",
    links: [
      { href: "/shipping", label: "Доставка и оплата" },
      { href: "/warranty", label: "Гарантия" },
      { href: "/trade-in", label: "Trade-in" },
      { href: "/used", label: "Проверенные б/у" },
      { href: "/compare", label: "Сравнение" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О магазине" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Objective — на главную">
              <BrandMark className="h-7 w-7 text-ink" />
              <span className="text-[17px] font-extrabold tracking-tight">Objective</span>
            </Link>
            {/* TODO: заменить контакты и график на данные заказчика */}
            <p className="mt-4 text-sm text-muted">
              Ул. Примерная, 12, Минск
              <br />
              Ежедневно 10:00–20:00
            </p>
            <p className="mt-3 text-sm">
              <a href="https://t.me/objective_demo" className="font-semibold text-accent hover:text-accent-strong">
                Telegram
              </a>
              <span className="mx-2 text-line">·</span>
              <a href="tel:+375290000000" className="font-semibold hover:text-ink">
                +375 29 000-00-00
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-ink/80 transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          {/* TODO: заменить юрссылки и реквизиты на данные заказчика */}
          <p>© 2026 Objective. Демо-прототип, цены и наличие подтверждаются менеджером.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Публичная оферта
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
