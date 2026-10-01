import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

/*
 * Контактные ссылки из единого конфига lib/site.ts (ТЗ §24).
 * Пока значение не предоставлено владельцем, показываем плейсхолдер без href —
 * фейковые ссылки и номера запрещены. Когда значение появится в конфиге,
 * плейсхолдер автоматически превратится в рабочую ссылку.
 */

const HOVER = "transition-colors hover:text-ink";

export function PhoneLink({ className }: { className?: string }) {
  if (SITE.phone) {
    return (
      <a
        href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
        className={cn("font-semibold", HOVER, className)}
      >
        {SITE.phone}
      </a>
    );
  }
  return (
    <span className={cn("font-medium text-muted", className)}>
      {SITE.phonePlaceholder}
      <span className="ml-1.5 text-ink/40">· уточняется</span>
    </span>
  );
}

export function SocialLink({
  network,
  className,
}: {
  network: "telegram" | "instagram";
  className?: string;
}) {
  const url = network === "telegram" ? SITE.telegramUrl : SITE.instagramUrl;
  const label = network === "telegram" ? SITE.telegramLabel : SITE.instagramLabel;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("font-semibold text-accent hover:text-accent-strong", className)}
      >
        {label}
      </a>
    );
  }
  return (
    <span
      className={cn("font-medium text-muted", className)}
      title="Ссылка появится после подключения"
    >
      {label}
      <span className="ml-1.5 text-ink/40">· скоро</span>
    </span>
  );
}
