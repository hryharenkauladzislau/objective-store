import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-20 lg:py-28">
      <div className="max-w-md">
        <p className="text-sm font-bold tabular-nums text-muted">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Страница не найдена</h1>
        <p className="mt-3 text-[15px] text-muted">
          Возможно, модель больше не в каталоге. Посмотрите актуальные товары.
        </p>
        <div className="mt-7">
          <Button href="/catalog">Каталог</Button>
        </div>
      </div>
    </Container>
  );
}
