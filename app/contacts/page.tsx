import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = { title: "Контакты" };

export default function ContactsPage() {
  return (
    <PagePlaceholder
      title="Контакты"
      description="Telegram, телефон, адрес и график работы. Демонстрационные контакты будут заменены данными заказчика."
      contactsTopic="question"
    />
  );
}
