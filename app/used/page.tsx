import Image from "next/image";
import { Container } from "@/components/ui/primitives";
import { getUsedUnits } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

export const metadata = { title: "Проверенные б/у устройства" };

const CONDITION_LABEL: Record<string, string> = {
  excellent: "Отличное",
  good: "Хорошее",
  fair: "Есть следы использования",
};

export default function UsedPage() {
  const units = getUsedUnits();

  return (
    <Container className="py-10 lg:py-14">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Проверенные б/у устройства</h1>
      <p className="mt-3 max-w-xl text-[15px] text-muted">
        Каждый экземпляр проходит проверку по чек-листу: Face ID, дисплей, камеры, динамики,
        микрофоны и аккумулятор. Паспорт показывает состояние конкретного устройства.
      </p>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {units.map((u) => (
          <li key={u.id} className="flex flex-col rounded-card border border-line bg-surface shadow-card">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[15px]">
              <Image src={u.images[0] ?? ""} alt={u.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-bold">
                  {u.name} · {u.storageGb} ГБ
                </h2>
                <span className="shrink-0 text-[15px] font-bold tabular-nums">{formatPrice(u.priceUsd)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {u.colorName} · {CONDITION_LABEL[u.condition] ?? u.condition}
              </p>

              <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Аккумулятор</dt>
                  <dd className="font-semibold tabular-nums">{u.batteryHealth}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Комплект</dt>
                  <dd className="text-right font-medium">{u.kit.join(", ")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Гарантия</dt>
                  <dd className="font-medium">{u.warrantyMonths} мес.</dd>
                </div>
                {u.defects ? (
                  <div className="flex justify-between">
                    <dt className="text-muted">Особенности</dt>
                    <dd className="text-right font-medium">{u.defects}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
