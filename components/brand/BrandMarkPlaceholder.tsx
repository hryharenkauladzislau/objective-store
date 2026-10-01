import { cn } from "@/lib/cn";

/*
 * Текстовый знак бренда — заглушка до получения логотипа от заказчика (ТЗ §6).
 * Размер задаётся внешним font-size (например, text-[17px] в шапке), поэтому
 * знак масштабируется от строки шапки до центральной композиции прелоадера.
 * Замена на настоящий SVG-логотип: переписать реализацию этого компонента,
 * места использования не меняются.
 */
export function BrandMarkPlaceholder({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex items-baseline gap-[0.1em] whitespace-nowrap", className)}
    >
      <span className="font-extrabold uppercase tracking-tight">Evgeniy</span>
      <span className="font-bold uppercase tracking-[0.16em] text-muted">Apple</span>
    </span>
  );
}
