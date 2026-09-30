/*
 * Временный знак магазина: абстрактная мишень-объектив из концентрических колец.
 * Используется в шапке, футере и фирменной загрузке (этап 2).
 * TODO: заменить на логотип заказчика, когда он будет предоставлен.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" className="text-accent" />
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-accent" />
    </svg>
  );
}
