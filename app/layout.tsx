import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DartLoader } from "@/components/loading/DartLoader";
import { FounderContactDock } from "@/components/founder/FounderContactDock";

/*
 * TODO: заменить название, описание и контакты на данные заказчика (ТЗ §24).
 */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EVGENIY APPLE — техника Apple в Минске: iPhone, Mac, iPad",
    template: "%s — EVGENIY APPLE",
  },
  description:
    "Техника Apple в Минске: актуальные iPhone, Mac, iPad и Watch, проверенные б/у устройства и Trade-in. Консультация лично от Евгения — основателя магазина.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <DartLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FounderContactDock />
      </body>
    </html>
  );
}
