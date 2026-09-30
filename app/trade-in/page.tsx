import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = { title: "Trade-in" };

export default function TradeInPage() {
  return (
    <PagePlaceholder
      title="Trade-in"
      description="Предварительная оценка устройства в зачёт нового. Выберите модель и состояние — менеджер подтвердит сумму после осмотра. Форма оценки появится на следующем этапе прототипа."
      contactsTopic="trade-in"
    />
  );
}
