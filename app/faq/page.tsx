import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = { title: "Частые вопросы" };

export default function FaqPage() {
  return (
    <PagePlaceholder
      title="Частые вопросы"
      description="Цены и наличие, гарантия, Trade-in, доставка и оплата. Пока — каркас раздела; полная версия соберёт вопросы с главной и ответит на них подробнее."
      contactsTopic="question"
    />
  );
}
