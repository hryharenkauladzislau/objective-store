import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = { title: "Доставка и оплата" };

export default function ShippingPage() {
  return (
    <PagePlaceholder
      title="Доставка и оплата"
      description="Условия, сроки и способы расчёта. Раздел наполняется после подтверждения текстов заказчиком."
      contactsTopic="availability"
    />
  );
}
