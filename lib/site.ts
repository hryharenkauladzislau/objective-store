/*
 * Единый конфиг витрины: имя, основатель, город, контакты и навигация (ТЗ §6, §24).
 *
 * Контакты — сознательные плейсхолдеры: пока владелец не предоставил значения,
 * интерфейс показывает подписи «уточняется / скоро» и не даёт рабочих ссылок —
 * фейковые номера и ссылки запрещены. Замена делается только в этом файле:
 * заполнить phone/telegramUrl/instagramUrl — все места отображения обновятся.
 */

export const SITE = {
  name: "EVGENIY APPLE",
  founderName: "Евгений",
  city: "Минск",

  /** Телефон владельца; null → показываем шаблон без tel-ссылки */
  phone: null as string | null,
  /** Шаблон-плейсхолдер, пока телефон не предоставлен */
  phonePlaceholder: "+375 (__) ___-__-__",

  /** Ссылка Telegram; null → «ссылка ожидается» (ТЗ §24) */
  telegramUrl: null as string | null,
  telegramLabel: "Telegram",

  /** Ссылка Instagram; null → «ссылка ожидается» */
  instagramUrl: null as string | null,
  instagramLabel: "Instagram",
};

export type NavLink = { href: string; label: string };

/** Навигация шапки — 8 пунктов строго по ТЗ §6 */
export const NAV_LINKS: NavLink[] = [
  { href: "/catalog", label: "Новые устройства" },
  { href: "/used", label: "Б/У устройства" },
  { href: "/trade-in", label: "Trade-in" },
  { href: "/shipping", label: "Доставка и оплата" },
  { href: "/warranty", label: "Гарантия" },
  { href: "/repair", label: "Ремонт и обслуживание" },
  { href: "/about", label: "Обо мне" },
  { href: "/contacts", label: "Контакты" },
];
