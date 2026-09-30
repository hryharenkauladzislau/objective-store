/*
 * Демонстрация фирменной загрузки (ТЗ §7).
 * Критическое изображение загружается ~1.2 с, поэтому анимация дротиков
 * видна полностью. На реальной главной загрузка обычно быстрее 400 мс
 * и прелоадер не показывается — это соответствует правилам ТЗ.
 * TODO: удалить страницу после согласования загрузки.
 */
export const metadata = { title: "Демо фирменной загрузки" };

export default function BootDemoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-md text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/api/slow-image"
          alt="Критическое изображение первого экрана"
          width={320}
          height={240}
          data-boot-critical="true"
          className="mx-auto rounded-2xl border border-line object-cover"
        />
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight">Фирменная загрузка</h1>
        <p className="mt-3 text-[15px] text-muted">
          Анимация показывается один раз за сессию. Чтобы увидеть снова — откройте
          страницу в новой вкладке или очистите sessionStorage.
        </p>
      </div>
    </main>
  );
}
