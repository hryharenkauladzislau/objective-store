"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/*
 * Шапка по ТЗ §6: логотип, Каталог, iPhone, б/у, Trade-in, Доставка, Гарантия,
 * Контакты, поиск и кнопка «Уточнить наличие». Компактнее после прокрутки.
 */

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?category=iphone", label: "iPhone" },
  { href: "/used", label: "б/у" },
  { href: "/trade-in", label: "Trade-in" },
  { href: "/shipping", label: "Доставка" },
  { href: "/warranty", label: "Гарантия" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-canvas/90 backdrop-blur transition-all duration-200",
        scrolled || menuOpen ? "border-line" : "border-transparent",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-200",
            scrolled ? "h-14" : "h-16",
          )}
        >
          {/* Текстовый логотип личного бренда: EVGENIY — основной, APPLE — вторичный */}
          <Link href="/" className="flex items-baseline gap-1.5" aria-label="EVGENIY APPLE — на главную">
            <span className="text-[17px] font-extrabold uppercase tracking-tight">Evgeniy</span>
            <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-muted">Apple</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/catalog"
                aria-label="Поиск по каталогу"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
                  <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
              <Button href="/contacts?topic=availability" size="sm">Уточнить наличие</Button>
            </div>

            {/* Мобильное меню */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Мобильная навигация"
            className="border-t border-line py-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-11 items-center text-[15px] font-medium text-ink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button href="/contacts?topic=availability" className="w-full">
                  Уточнить наличие
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
