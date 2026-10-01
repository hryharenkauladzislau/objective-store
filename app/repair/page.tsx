import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = { title: "Ремонт и обслуживание" };

export default function RepairPage() {
  return (
    <PagePlaceholder
      title="Ремонт и обслуживание"
      description="Диагностика, замена аккумулятора и дисплея, настройка и перенос данных. Сначала оценка, потом работа — стоимость согласуется заранее. Раздел наполняется после предоставления прайса владельцем."
      contactsTopic="question"
    />
  );
}
