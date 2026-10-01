"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Поиск, фильтры и сортировка каталога (ТЗ §11).
 * Состояние живёт в URL (?q=, ?category=, ?storage=, ?color=, ?availability=,
 * ?maxPrice=, ?sort=) — любой результат можно открыть по ссылке; клиентский
 * код только сериализует форму в URL. Пустая выдача обрабатывается на странице.
 */

export interface CatalogControlsState {
  q?: string;
  storage?: string;
  color?: string;
  availability?: string;
  maxPrice?: string;
  sort?: string;
  focus?: boolean;
}

const SORT_OPTIONS = [
  { value: "", label: "Рекомендации" },
  { value: "new", label: "Новизна" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
];

export function CatalogControls({
  state,
  storages,
  colors,
  chips,
  hasActiveFilters,
}: {
  state: CatalogControlsState;
  storages: number[];
  colors: string[];
  /** Чипсы категорий — рендерятся на сервере между поиском и фильтрами */
  chips: ReactNode;
  hasActiveFilters: boolean;
}) {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  /* Автофокус поиска, когда шапка ведёт в /catalog?focus=1; без setState в эффекте */
  useEffect(() => {
    if (state.focus && document.activeElement === document.body) {
      searchRef.current?.focus();
    }
  }, [state.focus]);

  const submitAsUrl = (form: HTMLFormElement) => {
    const usp = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      const s = String(value).trim();
      if (s) usp.set(key, s);
    }
    router.push(usp.size > 0 ? `/catalog?${usp.toString()}` : "/catalog");
  };

  return (
    <form
      action="/catalog"
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        submitAsUrl(e.currentTarget);
      }}
    >
      {/* Поиск + сортировка */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Поиск по каталогу</span>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted"
          >
            <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            name="q"
            defaultValue={state.q ?? ""}
            placeholder="Модель, серия, цвет или артикул"
            className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink/30"
          />
        </label>
        <label className="sr-only" htmlFor="catalog-sort">
          Сортировка
        </label>
        <select
          id="catalog-sort"
          name="sort"
          defaultValue={state.sort ?? ""}
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className="h-11 rounded-full border border-line bg-surface px-4 text-sm font-medium outline-none transition-colors focus:border-ink/30"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value || "recommended"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-11 shrink-0 rounded-full bg-accent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-accent-strong"
        >
          Показать
        </button>
      </div>

      {chips}

      {/* Фильтры — сворачиваемая панель, работает без JavaScript (details) */}
      <details className="group mt-3 rounded-card border border-line bg-surface">
        <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            Фильтры
            {hasActiveFilters ? (
              <span className="rounded-full bg-tint px-2 py-0.5 text-xs font-bold text-accent">
                активны
              </span>
            ) : null}
          </span>
          <span
            aria-hidden="true"
            className="text-muted transition-transform duration-200 ease-out-soft group-open:rotate-45"
          >
            +
          </span>
        </summary>

        <div className="grid gap-4 border-t border-line p-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Память</span>
            <select
              name="storage"
              defaultValue={state.storage ?? ""}
              className="h-10 rounded-card border border-line bg-canvas px-3 text-sm outline-none focus:border-ink/30"
            >
              <option value="">Любая</option>
              {storages.map((gb) => (
                <option key={gb} value={gb}>
                  {gb} ГБ
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Цвет</span>
            <select
              name="color"
              defaultValue={state.color ?? ""}
              className="h-10 rounded-card border border-line bg-canvas px-3 text-sm outline-none focus:border-ink/30"
            >
              <option value="">Любой</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">
              Цена до, $
            </span>
            <input
              type="number"
              name="maxPrice"
              min={10}
              step={10}
              inputMode="numeric"
              defaultValue={state.maxPrice ?? ""}
              placeholder="3000"
              className="h-10 rounded-card border border-line bg-canvas px-3 text-sm outline-none focus:border-ink/30"
            />
          </label>

          <fieldset className="sm:col-span-3">
            <legend className="text-xs font-bold uppercase tracking-wide text-muted">
              Наличие
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { value: "", label: "Все" },
                { value: "in-stock", label: "В наличии" },
                { value: "on-order", label: "Под заказ" },
              ].map((opt, i) => (
                <label
                  key={opt.value || "all"}
                  className={cn(
                    "cursor-pointer rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium transition-colors",
                    "has-checked:border-accent has-checked:bg-tint has-checked:text-accent",
                  )}
                >
                  <input
                    type="radio"
                    name="availability"
                    value={opt.value}
                    defaultChecked={i === 0 ? !state.availability : state.availability === opt.value}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </details>

      {hasActiveFilters ? (
        <Link
          href="/catalog"
          className="mt-3 inline-block text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          Сбросить всё
        </Link>
      ) : null}
    </form>
  );
}
