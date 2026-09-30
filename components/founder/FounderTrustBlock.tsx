import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

/*
 * Личный блок доверия после товарной карусели: лёгкий, персональный,
 * визуально связан с первым экраном (та же круглая подача фото и зелёный
 * индикатор доступности). Ленивая загрузка фотографии — блок ниже фолда.
 */
export function FounderTrustBlock() {
  return (
    <section aria-labelledby="founder-trust-title" className="py-14 lg:py-20">
      <Container>
        <div className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-card sm:flex-row sm:items-center sm:gap-8 lg:p-8">
          <div className="relative shrink-0 self-start sm:self-center">
            <Image
              src="/images/evgeniy-founder-avatar.webp"
              alt="Евгений — основатель магазина EVGENIY APPLE"
              width={88}
              height={88}
              loading="lazy"
              unoptimized
              className="h-[88px] w-[88px] rounded-full border border-line object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent"
            />
          </div>

          <div className="max-w-xl">
            <h2 id="founder-trust-title" className="text-xl font-extrabold tracking-tight lg:text-2xl">
              Можно просто спросить Евгения
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Если не знаете, какую модель, объём памяти или комплектацию выбрать — напишите.
              Я помогу сравнить варианты и не переплачивать за ненужные функции.
            </p>
          </div>

          <div className="sm:ml-auto">
            <Button
              href={SITE.telegramUrl}
              variant="secondary"
              className="w-full sm:w-auto"
              ariaLabel={`Получить консультацию — ${SITE.telegramLabel}`}
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
