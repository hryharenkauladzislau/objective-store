import Link from "next/link";
import { BrandMarkPlaceholder } from "@/components/brand/BrandMarkPlaceholder";
import { Container } from "@/components/ui/primitives";
import { PhoneLink, SocialLink } from "@/components/layout/ContactLinks";
import { SITE } from "@/lib/site";

/*
 * Footer по ТЗ §10: категории, покупателям, компания, контакты-плейсхолдеры,
 * юридические ссылки. Контакты — из lib/site.ts без фейковых значений.
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
      { href: "/repair", label: "Ремонт и обслуживание" },
      { href: "/trade-in", label: "Trade-in" },
      { href: "/used", label: "Проверенные б/у" },
      { href: "/compare", label: "Сравнение" },
      { href: "/faq", label: "Частые вопросы" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "Обо мне" },
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
            <Link href="/" aria-label="EVGENIY APPLE — на главную">
              <BrandMarkPlaceholder className="text-[17px]" />
            </Link>
            {/* TODO: заменить адрес и график на данные владельца (ТЗ §24) */}
            <p className="mt-4 text-sm text-muted">
              {SITE.city} — адрес и график уточняются
              <br />
              Ответы на вопросы — лично от {SITE.founderName}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
              <PhoneLink />
              <SocialLink network="telegram" />
              <SocialLink network="instagram" />
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
          <p>© 2026 {SITE.name}. Демо-прототип, цены и наличие подтверждает Евгений перед покупкой.</p>
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
