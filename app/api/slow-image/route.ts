// Временный маршрут для визуальной проверки DartLoader (удаляется после теста)
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return NextResponse.redirect(
    "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-camera-close-up-250909_big.jpg.large.jpg",
    {
      status: 302,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
