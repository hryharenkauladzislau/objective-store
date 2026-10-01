import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { FounderContactSlot } from "@/components/founder/FounderContactSlot";

/*
 * Временная страница-каркас для служебных разделов.
 * Заполняется реальным контентом на соответствующем этапе.
 */
export function PagePlaceholder({
  title,
  description,
  contactsTopic,
  withContactSlot = true,
  children,
}: {
  title: string;
  description: string;
  contactsTopic?: "availability" | "price" | "question" | "trade-in";
  /** Отключить встроенный контактный слот (например, на самой странице контактов) */
  withContactSlot?: boolean;
  /** Дополнительный контент под кнопками */
  children?: ReactNode;
}) {
  return (
    <>
      <Container className="py-16 lg:py-24">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{title}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/catalog">Каталог</Button>
            {contactsTopic ? (
              <Button href={`/contacts?topic=${contactsTopic}`} variant="secondary">
                Задать вопрос
              </Button>
            ) : null}
          </div>
          {children}
        </div>
      </Container>
      {withContactSlot ? <FounderContactSlot /> : null}
    </>
  );
}
