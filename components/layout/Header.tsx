"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMarkPlaceholder } from "@/components/brand/BrandMarkPlaceholder";
import { PhoneLink, SocialLink } from "@/components/layout/ContactLinks";
import { Container } from "@/components/ui/primitives";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

/*
 * Двухуровневая шапка (ТЗ §6):
 * - служебная строка: телефон и мессенджеры — плейсхолдеры из lib/site.ts;
 * - основная строка: знак бренда + 8 пунктов навигации + рабочий поиск
 *   (ведёт в поиск каталога).
 * Desktop ≥1280px: 44 + 64 = 108 px; при прокрутке служебная строка убирается
 * и основная сжимается (компакт). Ниже breakpoint — выпадающее меню, высота 64 px.
 */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rafRef = useRef(0);

  /* Компактное состояние шапки; без синхронного setState в теле эффекта */
  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-canvas/90 backdrop-blur transition-colors duration-200",
        scrolled || menuOpen ? "border-line" : "border-transparent",
      )}
    >
      {/* Служебная строка: контакты из конфига, убирается при прокрутке */}
      <div
        className={cn(
          "hidden overflow-hidden transition-all duration-300 ease-out-soft md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <Container>
          <div className="flex h-11 items-center justify-between text-[13px]">
            <PhoneLink />
            <div className="flex items-center gap-3">
              <SocialLink network="telegram" />
              <span aria-hidden="true" className="text-ink/20">
                ·
              </span>
              <SocialLink network="instagram" />
            </div>
          </div>
        </Container>
      </div>

      {/* Основная строка */}
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-200",
            scrolled ? "h-16 lg:h-14" : "h-16",
          )}
        >
          <Link href="/" aria-label="EVGENIY APPLE — на главную">
            <BrandMarkPlaceholder className="text-[17px]" />
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Основная навигация">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/catalog?focus=1"
              aria-label="Поиск по каталогу"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
                <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Выпадающее меню ниже xl (8 пунктов не помещаются в строку) */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 xl:hidden"
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
            className="border-t border-line pb-4 pt-2 xl:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((item) => (
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
            </ul>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-sm">
              <PhoneLink />
              <div className="flex items-center gap-3">
                <SocialLink network="telegram" />
                <SocialLink network="instagram" />
              </div>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
