import Image from "next/image";
import { SITE } from "@/lib/site";

/*
 * Фиксированная кнопка связи (личный бренд владельца) — единственная плавающая
 * точка входа (ТЗ §8). Пока ссылка Telegram не предоставлена, ведёт на страницу
 * контактов вместо нерабочего адреса; после заполнения lib/site.ts
 * автоматически переключается на Telegram.
 */
export function FounderContactDock() {
  const href = SITE.telegramUrl ?? "/contacts?topic=question";
  const isExternal = SITE.telegramUrl !== null;

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`Задать вопрос — ${SITE.telegramLabel} или страница контактов`}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 shadow-card transition-colors duration-200 hover:border-ink/25"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom) * 0.4)" }}
    >
      <span className="relative shrink-0">
        <Image
          src="/images/evgeniy-founder-avatar.webp"
          alt="Евгений — основатель магазина EVGENIY APPLE"
          width={34}
          height={34}
          unoptimized
          className="h-[34px] w-[34px] rounded-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent"
        />
      </span>
      <span className="text-sm font-semibold">Задать вопрос</span>
    </a>
  );
}
