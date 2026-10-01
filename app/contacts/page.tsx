import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { PhoneLink, SocialLink } from "@/components/layout/ContactLinks";
import { SITE } from "@/lib/site";

export const metadata = { title: "Контакты" };

/*
 * Контакты (ТЗ §24): данные владельца приходят из lib/site.ts.
 * Пока телефон и мессенджеры не предоставлены — честные плейсхолдеры
 * без фейковых ссылок; при заполнении конфига страница обновится сама.
 */
export default function ContactsPage() {
  return (
    <PagePlaceholder
      title="Контакты"
      description={`Магазин техники Apple в ${SITE.city}. Ответы на вопросы — лично от ${SITE.founderName}, без операторов и шаблонных ответов.`}
      withContactSlot={false}
    >
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
        <PhoneLink />
        <SocialLink network="telegram" />
        <SocialLink network="instagram" />
      </div>
      <p className="mt-4 text-sm text-muted">
        Адрес точки продаж и график работы появятся здесь после подтверждения данных владельцем.
      </p>
    </PagePlaceholder>
  );
}
