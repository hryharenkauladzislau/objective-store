import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = { title: "О магазине" };

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="О магазине"
      description="Факты о магазине, преимущества, адрес и график. Раздел наполняется после предоставления материалов заказчика."
      contactsTopic="question"
    />
  );
}
