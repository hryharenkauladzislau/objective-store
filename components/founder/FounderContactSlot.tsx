import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

/*
 * Встроенный контактный слот для служебных страниц (ТЗ §8):
 * короткое предложение написать владельцу — вместо плавающих кнопок.
 * Единственная плавающая точка входа остаётся FounderContactDock.
 */
export function FounderContactSlot({ note }: { note?: string }) {
  return (
    <section aria-label="Связаться с Евгением" className="border-t border-line bg-surface">
      <Container className="flex flex-col items-start gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-[15px] leading-relaxed text-muted">
          {note ?? `Остались вопросы по разделу? Напишите — ответит лично ${SITE.founderName}.`}
        </p>
        <Button href="/contacts?topic=question" variant="secondary" className="shrink-0">
          Задать вопрос
        </Button>
      </Container>
    </section>
  );
}
