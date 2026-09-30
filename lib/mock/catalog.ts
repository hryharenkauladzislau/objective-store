import type { Category, Product, UsedUnit, Variant } from "@/lib/catalog";

/*
 * Mock-каталог первой итерации.
 *
 * TODO: заменить данными заказчика — SKU, цены, наличие и фотографии
 * переносятся из Excel-учёта (ТЗ §19) через будущий API.
 * TODO: фотографии — официальные пресс-материалы Apple Newsroom;
 * при запуске заменить на товарные фото заказчика.
 */

const IMG = {
  iphone17ProCamera:
    "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-camera-close-up-250909_big.jpg.large.jpg",
  iphone17Pro48mp:
    "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-48MP-photography-01-250909_big.jpg.large.jpg",
  iphone17ProLowlight:
    "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-low-light-photography-250909_big.jpg.large.jpg",
  iphone17ProTele:
    "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-8x-Telephoto-photography-250909_big.jpg.large.jpg",
  iphone17ProPortrait:
    "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-Portrait-mode-photography-250909_big.jpg.large.jpg",
  iphone17ColorLineup:
    "https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-color-lineup-250909_big.jpg.large.jpg",
  iphone17Lineup:
    "https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-lineup-250909_big.jpg.large.jpg",
  iphone17Fusion:
    "https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-48MP-Fusion-1x-photography-250909_big.jpg.large.jpg",
  iphone17Macro:
    "https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-macro-photography-250909_big.jpg.large.jpg",
  iphone17Selfie:
    "https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-group-selfie-photography-250909_big.jpg.large.jpg",
  iphone16ProFinish:
    "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
  iphone16ProMacro:
    "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-macro-photography-240909_big.jpg.large.jpg",
  iphone16ProFusion:
    "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-Fusion-photography-01-240909_big.jpg.large.jpg",
  iphone16Finish:
    "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-finish-lineup-240909_big.jpg.large.jpg",
  iphone16Lineup:
    "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-lineup-240909_big.jpg.large.jpg",
  iphone16UltraWide:
    "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-Ultra-Wide-photography-01-240909_big.jpg.large.jpg",
  iphone15ColorLineup:
    "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg",
  iphone15Design:
    "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-design-230912_big.jpg.large.jpg",
  iphone15Camera:
    "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-48MP-01-230912_big.jpg.large.jpg",
  iphone15FineWoven:
    "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-FineWoven-3-up-230912_big.jpg.large.jpg",
  iphone14ProColor:
    "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-SOiP-main-1x-color-220907_big.jpg.large.jpg",
  iphone14ProBw:
    "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-SOiP-main-1x-bw-220907_big.jpg.large.jpg",
  iphone14ProFitness:
    "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-Fitness-Plus-220907_big.jpg.large.jpg",
  macbookProFusion:
    "https://www.apple.com/newsroom/images/2024/10/new-macbook-pro/article/Apple-MacBook-Pro-M4-Fusion_big.jpg.large.jpg",
  macbookProFlame:
    "https://www.apple.com/newsroom/images/2024/10/new-macbook-pro/article/Apple-MacBook-Pro-M4-Flame_big.jpg.large.jpg",
  macbookProKeyboard:
    "https://www.apple.com/newsroom/images/2024/10/new-macbook-pro/article/Apple-MacBook-Pro-M4-Magic-Keyboard-close-up_big.jpg.large.jpg",
  macbookAirDisplay:
    "https://www.apple.com/newsroom/images/2025/03/apple-introduces-the-new-macbook-air-with-the-m4-chip-and-a-sky-blue-color/article/Apple-MacBook-Air-Liquid-Retina-display-250305_big.jpg.large.jpg",
  macbookAirKeyboard:
    "https://www.apple.com/newsroom/images/2025/03/apple-introduces-the-new-macbook-air-with-the-m4-chip-and-a-sky-blue-color/article/Apple-MacBook-Air-Touch-ID-and-Magic-Keyboard-250305_big.jpg.large.jpg",
  macbookAirCiv:
    "https://www.apple.com/newsroom/images/2025/03/apple-introduces-the-new-macbook-air-with-the-m4-chip-and-a-sky-blue-color/article/Apple-MacBook-Air-Civilization-VII-250305_big.jpg.large.jpg",
  ipadProPencil:
    "https://www.apple.com/newsroom/images/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/article/Apple-iPad-Pro-Apple-Pencil-Pro-251015_big.jpg.large.jpg",
  ipadProKeyboard:
    "https://www.apple.com/newsroom/images/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/article/Apple-iPad-Pro-Magic-Keyboard-01-251015_big.jpg.large.jpg",
  ipadProWifi:
    "https://www.apple.com/newsroom/images/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/article/Apple-iPad-Pro-Wi-Fi-251015_big.jpg.large.jpg",
  ipadAirKeyboard:
    "https://www.apple.com/newsroom/images/2025/03/apple-introduces-ipad-air-with-powerful-m3-chip-and-new-magic-keyboard/article/Apple-iPad-Air-and-Magic-Keyboard-250304_big.jpg.large.jpg",
  ipadAirChip:
    "https://www.apple.com/newsroom/images/2025/03/apple-introduces-ipad-air-with-powerful-m3-chip-and-new-magic-keyboard/article/Apple-iPad-Air-M3-chip-250304_big.jpg.large.jpg",
  watchSeries11:
    "https://www.apple.com/newsroom/images/2025/09/get-ready-to-discover-the-next-generation-of-iphone-apple-watch-and-airpods/article/Apple-Watch-Series-11-band-lineup_big.jpg.large.jpg",
  watchNike:
    "https://www.apple.com/newsroom/images/2025/09/get-ready-to-discover-the-next-generation-of-iphone-apple-watch-and-airpods/article/Apple-Watch-Nike-band-lineup_big.jpg.large.jpg",
  watchUltra:
    "https://www.apple.com/newsroom/images/2025/09/get-ready-to-discover-the-next-generation-of-iphone-apple-watch-and-airpods/article/Apple-Watch-Ultra-band-lineup_big.jpg.large.jpg",
  airpodsPro3Lifestyle:
    "https://www.apple.com/newsroom/images/2025/09/introducing-airpods-pro-3-the-ultimate-audio-experience/article/Apple-AirPods-Pro-3-lifestyle-01-250909_big.jpg.large.jpg",
  airpodsPro3Second:
    "https://www.apple.com/newsroom/images/2025/09/introducing-airpods-pro-3-the-ultimate-audio-experience/article/Apple-AirPods-Pro-3-lifestyle-02-250909_big.jpg.large.jpg",
  airpodsPro3Hearing:
    "https://www.apple.com/newsroom/images/2025/09/introducing-airpods-pro-3-the-ultimate-audio-experience/article/Apple-AirPods-Pro-3-hearing-health-250909_big.jpg.large.jpg",
} as const;

export const categories: Category[] = [
  { slug: "iphone", name: "iPhone", caption: "Актуальные модели, официальные поставки, гарантия магазина" },
  { slug: "mac", name: "Mac", caption: "MacBook Air и Pro — конфигурации под задачи" },
  { slug: "ipad", name: "iPad", caption: "Pro и Air — для работы, учёбы и рисования" },
  { slug: "watch", name: "Apple Watch", caption: "Series, Ultra и SE — со сменными ремешками" },
  { slug: "airpods", name: "AirPods", caption: "Pro и обычные — с активным шумоподавлением" },
  { slug: "accessories", name: "Аксессуары", caption: "Чехлы, MagSafe, зарядки и кабели" },
];

function sim(us: string, eu: string): string[] {
  return [us, eu];
}

function makeVariants(
  skuPrefix: string,
  storageOptions: Array<{ gb: number | null; extraUsd: number }>,
  colors: Array<{ name: string; hex: string; images: string[] }>,
  simOptions: string[],
  basePriceUsd: number,
  status: Variant["status"] = "in-stock",
): Variant[] {
  const variants: Variant[] = [];
  for (const storage of storageOptions) {
    for (const [ci, color] of colors.entries()) {
      for (const [si, s] of simOptions.entries()) {
        variants.push({
          sku: `${skuPrefix}-${storage.gb ?? "na"}-${ci + 1}${si + 1}`,
          storageGb: storage.gb,
          colorHex: color.hex,
          colorName: color.name,
          sim: s,
          basePriceUsd: basePriceUsd + storage.extraUsd,
          manualPriceUsd: null,
          status,
          images: color.images,
        });
      }
    }
  }
  return variants;
}

const SIM_PHONE = sim("Dual eSIM", "Nano-SIM + eSIM");

export const products: Product[] = [
  {
    slug: "iphone-17-pro-max",
    category: "iphone",
    name: "iPhone 17 Pro Max",
    series: "iPhone 17",
    tagline: "6.9″, A19 Pro, лучший аккумулятор в iPhone",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.9″ Super Retina XDR, 120 Гц" },
      { label: "Процессор", value: "A19 Pro, 8 ядер" },
      { label: "Камеры", value: "48 + 48 + 48 Мп, зум 8×" },
      { label: "Аккумулятор", value: "до 39 часов видео" },
      { label: "Материал", value: "Алюминий, керамика Ceramic Shield 2" },
    ],
    variants: makeVariants(
      "IP17PM",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }, { gb: 1024, extraUsd: 400 }],
      [
        { name: "Cosmic Orange", hex: "#d16743", images: [IMG.iphone17ProCamera, IMG.iphone17Pro48mp, IMG.iphone17ProTele] },
        { name: "Deep Blue", hex: "#3d4a5d", images: [IMG.iphone17ProLowlight, IMG.iphone17Pro48mp, IMG.iphone17ProPortrait] },
        { name: "Silver", hex: "#e3e4e0", images: [IMG.iphone17Pro48mp, IMG.iphone17ProCamera, IMG.iphone17ProLowlight] },
      ],
      SIM_PHONE,
      1199,
    ),
  },
  {
    slug: "iphone-17-pro",
    category: "iphone",
    name: "iPhone 17 Pro",
    series: "iPhone 17",
    tagline: "6.3″, A19 Pro, тройная камера 48 Мп",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.3″ Super Retina XDR, 120 Гц" },
      { label: "Процессор", value: "A19 Pro, 8 ядер" },
      { label: "Камеры", value: "48 + 48 + 48 Мп, зум 8×" },
      { label: "Аккумулятор", value: "до 31 часа видео" },
      { label: "Материал", value: "Алюминий, керамика Ceramic Shield 2" },
    ],
    variants: makeVariants(
      "IP17P",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }, { gb: 1024, extraUsd: 400 }],
      [
        { name: "Cosmic Orange", hex: "#d16743", images: [IMG.iphone17ProCamera, IMG.iphone17Pro48mp, IMG.iphone17ProTele] },
        { name: "Deep Blue", hex: "#3d4a5d", images: [IMG.iphone17ProLowlight, IMG.iphone17ProPortrait, IMG.iphone17Pro48mp] },
        { name: "Silver", hex: "#e3e4e0", images: [IMG.iphone17Pro48mp, IMG.iphone17ProCamera, IMG.iphone17ProTele] },
      ],
      SIM_PHONE,
      1099,
    ),
  },
  {
    slug: "iphone-17",
    category: "iphone",
    name: "iPhone 17",
    series: "iPhone 17",
    tagline: "6.3″, A19, дисплей 120 Гц — впервые в базовой модели",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.3″ Super Retina XDR, 120 Гц" },
      { label: "Процессор", value: "A19, 6 ядер" },
      { label: "Камеры", value: "48 Мп Fusion + 48 Мп Ultra Wide" },
      { label: "Аккумулятор", value: "до 30 часов видео" },
      { label: "Особенность", value: "Фронтальная камера Center Stage" },
    ],
    variants: makeVariants(
      "IP17",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }],
      [
        { name: "Lavender", hex: "#c8c3e2", images: [IMG.iphone17ColorLineup, IMG.iphone17Lineup, IMG.iphone17Fusion] },
        { name: "Sage", hex: "#b4c0b2", images: [IMG.iphone17Lineup, IMG.iphone17Macro, IMG.iphone17ColorLineup] },
        { name: "Mist Blue", hex: "#c9d7e4", images: [IMG.iphone17Fusion, IMG.iphone17ColorLineup, IMG.iphone17Selfie] },
        { name: "White", hex: "#f5f5f2", images: [IMG.iphone17Lineup, IMG.iphone17Fusion, IMG.iphone17ColorLineup] },
        { name: "Black", hex: "#1e1e20", images: [IMG.iphone17ColorLineup, IMG.iphone17Lineup, IMG.iphone17Macro] },
      ],
      SIM_PHONE,
      799,
    ),
  },
  {
    slug: "iphone-air",
    category: "iphone",
    name: "iPhone Air",
    series: "iPhone 17",
    tagline: "5.6 мм, титан, самый тонкий iPhone",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.5″ Super Retina XDR, 120 Гц" },
      { label: "Процессор", value: "A19 Pro, 8 ядер" },
      { label: "Камеры", value: "48 Мп Fusion, зум 2×" },
      { label: "Корпус", value: "Титан, 5.6 мм, 165 г" },
      { label: "Аккумулятор", value: "до 27 часов видео" },
    ],
    variants: makeVariants(
      "IPAIR",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }],
      [
        { name: "Sky Blue", hex: "#c8d8e8", images: [IMG.iphone17Lineup, IMG.iphone17ColorLineup, IMG.iphone17Selfie] },
        { name: "Light Gold", hex: "#e9ddc8", images: [IMG.iphone17ColorLineup, IMG.iphone17Lineup, IMG.iphone17Fusion] },
        { name: "Cloud White", hex: "#eef0ef", images: [IMG.iphone17Lineup, IMG.iphone17Fusion, IMG.iphone17ColorLineup] },
        { name: "Space Black", hex: "#232323", images: [IMG.iphone17ColorLineup, IMG.iphone17Lineup, IMG.iphone17Macro] },
      ],
      sim("eSIM", "eSIM"),
      999,
    ),
  },
  {
    slug: "iphone-16-pro-max",
    category: "iphone",
    name: "iPhone 16 Pro Max",
    series: "iPhone 16",
    tagline: "6.9″, A18 Pro, титановый корпус",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.9″ Super Retina XDR, 120 Гц" },
      { label: "Процессор", value: "A18 Pro, 8 ядер" },
      { label: "Камеры", value: "48 + 48 + 12 Мп, зум 5×" },
      { label: "Аккумулятор", value: "до 33 часов видео" },
    ],
    variants: makeVariants(
      "IP16PM",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }],
      [
        { name: "Desert Titanium", hex: "#bfa38a", images: [IMG.iphone16ProFinish, IMG.iphone16ProMacro, IMG.iphone16ProFusion] },
        { name: "Natural Titanium", hex: "#b7b2ab", images: [IMG.iphone16ProFinish, IMG.iphone16ProFusion, IMG.iphone16ProMacro] },
        { name: "White Titanium", hex: "#e8e8e6", images: [IMG.iphone16ProFusion, IMG.iphone16ProFinish, IMG.iphone16ProMacro] },
        { name: "Black Titanium", hex: "#3a3a3c", images: [IMG.iphone16ProFinish, IMG.iphone16ProMacro, IMG.iphone16ProFusion] },
      ],
      SIM_PHONE,
      949,
    ),
  },
  {
    slug: "iphone-16-pro",
    category: "iphone",
    name: "iPhone 16 Pro",
    series: "iPhone 16",
    tagline: "6.3″, A18 Pro, камера-контроль",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.3″ Super Retina XDR, 120 Гц" },
      { label: "Процессор", value: "A18 Pro, 8 ядер" },
      { label: "Камеры", value: "48 + 48 + 12 Мп, зум 5×" },
      { label: "Аккумулятор", value: "до 27 часов видео" },
    ],
    variants: makeVariants(
      "IP16P",
      [{ gb: 128, extraUsd: 0 }, { gb: 256, extraUsd: 100 }, { gb: 512, extraUsd: 300 }],
      [
        { name: "Desert Titanium", hex: "#bfa38a", images: [IMG.iphone16ProFinish, IMG.iphone16ProMacro, IMG.iphone16ProFusion] },
        { name: "Natural Titanium", hex: "#b7b2ab", images: [IMG.iphone16ProFinish, IMG.iphone16ProFusion, IMG.iphone16ProMacro] },
        { name: "White Titanium", hex: "#e8e8e6", images: [IMG.iphone16ProFusion, IMG.iphone16ProFinish, IMG.iphone16ProMacro] },
        { name: "Black Titanium", hex: "#3a3a3c", images: [IMG.iphone16ProFinish, IMG.iphone16ProMacro, IMG.iphone16ProFusion] },
      ],
      SIM_PHONE,
      849,
    ),
  },
  {
    slug: "iphone-16",
    category: "iphone",
    name: "iPhone 16",
    series: "iPhone 16",
    tagline: "6.1″, A18, кнопка Camera Control",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.1″ Super Retina XDR" },
      { label: "Процессор", value: "A18, 6 ядер" },
      { label: "Камеры", value: "48 Мп Fusion + 12 Мп Ultra Wide" },
      { label: "Аккумулятор", value: "до 22 часов видео" },
    ],
    variants: makeVariants(
      "IP16",
      [{ gb: 128, extraUsd: 0 }, { gb: 256, extraUsd: 100 }],
      [
        { name: "Ultramarine", hex: "#7a8ce8", images: [IMG.iphone16Finish, IMG.iphone16Lineup, IMG.iphone16UltraWide] },
        { name: "Teal", hex: "#a7c4bc", images: [IMG.iphone16Finish, IMG.iphone16UltraWide, IMG.iphone16Lineup] },
        { name: "Pink", hex: "#eab8c5", images: [IMG.iphone16Lineup, IMG.iphone16Finish, IMG.iphone16UltraWide] },
        { name: "White", hex: "#f2f2f2", images: [IMG.iphone16Finish, IMG.iphone16Lineup, IMG.iphone16UltraWide] },
        { name: "Black", hex: "#1d1d1f", images: [IMG.iphone16Lineup, IMG.iphone16Finish, IMG.iphone16UltraWide] },
      ],
      SIM_PHONE,
      649,
    ),
  },
  {
    slug: "iphone-16e",
    category: "iphone",
    name: "iPhone 16e",
    series: "iPhone 16",
    tagline: "6.1″, A18, доступная модель 2025 года",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.1″ Super Retina XDR" },
      { label: "Процессор", value: "A18, 6 ядер" },
      { label: "Камеры", value: "48 Мп Fusion" },
      { label: "Аккумулятор", value: "до 26 часов видео" },
    ],
    variants: makeVariants(
      "IP16E",
      [{ gb: 128, extraUsd: 0 }, { gb: 256, extraUsd: 100 }],
      [
        { name: "White", hex: "#f2f2f2", images: [IMG.iphone16Finish, IMG.iphone16Lineup, IMG.iphone16UltraWide] },
        { name: "Black", hex: "#1d1d1f", images: [IMG.iphone16Lineup, IMG.iphone16Finish, IMG.iphone16UltraWide] },
      ],
      SIM_PHONE,
      549,
      "on-order",
    ),
  },
  {
    slug: "iphone-15",
    category: "iphone",
    name: "iPhone 15",
    series: "iPhone 15",
    tagline: "6.1″, A16 Bionic, Dynamic Island",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.1″ Super Retina XDR" },
      { label: "Процессор", value: "A16 Bionic" },
      { label: "Камеры", value: "48 Мп Main + 12 Мп Ultra Wide" },
      { label: "Разъём", value: "USB-C" },
    ],
    variants: makeVariants(
      "IP15",
      [{ gb: 128, extraUsd: 0 }, { gb: 256, extraUsd: 100 }],
      [
        { name: "Blue", hex: "#d5dde3", images: [IMG.iphone15ColorLineup, IMG.iphone15Design, IMG.iphone15Camera] },
        { name: "Green", hex: "#d1d8cd", images: [IMG.iphone15ColorLineup, IMG.iphone15Camera, IMG.iphone15Design] },
        { name: "Yellow", hex: "#f4e6a2", images: [IMG.iphone15Design, IMG.iphone15ColorLineup, IMG.iphone15Camera] },
        { name: "Pink", hex: "#eab8c5", images: [IMG.iphone15ColorLineup, IMG.iphone15Design, IMG.iphone15Camera] },
        { name: "Black", hex: "#1d1d1f", images: [IMG.iphone15Design, IMG.iphone15ColorLineup, IMG.iphone15Camera] },
      ],
      SIM_PHONE,
      599,
    ),
  },
  {
    slug: "iphone-15-plus",
    category: "iphone",
    name: "iPhone 15 Plus",
    series: "iPhone 15",
    tagline: "6.7″, A16 Bionic, большой экран и автономность",
    featuredOnHome: true,
    specs: [
      { label: "Экран", value: "6.7″ Super Retina XDR" },
      { label: "Процессор", value: "A16 Bionic" },
      { label: "Камеры", value: "48 Мп Main + 12 Мп Ultra Wide" },
      { label: "Аккумулятор", value: "до 26 часов видео" },
    ],
    variants: makeVariants(
      "IP15P",
      [{ gb: 128, extraUsd: 0 }, { gb: 256, extraUsd: 100 }],
      [
        { name: "Blue", hex: "#d5dde3", images: [IMG.iphone15ColorLineup, IMG.iphone15Design, IMG.iphone15Camera] },
        { name: "Green", hex: "#d1d8cd", images: [IMG.iphone15Design, IMG.iphone15ColorLineup, IMG.iphone15Camera] },
        { name: "Pink", hex: "#eab8c5", images: [IMG.iphone15ColorLineup, IMG.iphone15Design, IMG.iphone15Camera] },
        { name: "Black", hex: "#1d1d1f", images: [IMG.iphone15Design, IMG.iphone15ColorLineup, IMG.iphone15Camera] },
      ],
      SIM_PHONE,
      699,
    ),
  },
  {
    slug: "macbook-pro-16-m4",
    category: "mac",
    name: "MacBook Pro 16″ M4 Pro",
    series: "MacBook Pro",
    tagline: "Thunderbolt 5, Liquid Retina XDR 120 Гц",
    featuredOnHome: false,
    specs: [
      { label: "Экран", value: "16.2″ Liquid Retina XDR, 120 Гц" },
      { label: "Процессор", value: "M4 Pro, 14 ядер CPU / 20 GPU" },
      { label: "Память", value: "24 ГБ объединённой памяти" },
      { label: "Аккумулятор", value: "до 24 часов работы" },
      { label: "Порты", value: "3× Thunderbolt 5, HDMI, SDXC" },
    ],
    variants: makeVariants(
      "MBP16",
      [{ gb: 512, extraUsd: 0 }, { gb: 1024, extraUsd: 200 }, { gb: 2048, extraUsd: 600 }],
      [
        { name: "Space Black", hex: "#2e2c2e", images: [IMG.macbookProFusion, IMG.macbookProFlame, IMG.macbookProKeyboard] },
        { name: "Silver", hex: "#e1e2e4", images: [IMG.macbookProKeyboard, IMG.macbookProFusion, IMG.macbookProFlame] },
      ],
      ["—"],
      2499,
    ),
  },
  {
    slug: "macbook-air-13-m4",
    category: "mac",
    name: "MacBook Air 13″ M4",
    series: "MacBook Air",
    tagline: "1.24 кг, до 18 часов работы, новый Sky Blue",
    featuredOnHome: false,
    specs: [
      { label: "Экран", value: "13.6″ Liquid Retina" },
      { label: "Процессор", value: "M4, 10 ядер CPU / 8 GPU" },
      { label: "Память", value: "16 ГБ объединённой памяти" },
      { label: "Аккумулятор", value: "до 18 часов работы" },
      { label: "Вес", value: "1.24 кг" },
    ],
    variants: makeVariants(
      "MBA13",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }],
      [
        { name: "Sky Blue", hex: "#aebfd0", images: [IMG.macbookAirDisplay, IMG.macbookAirKeyboard, IMG.macbookAirCiv] },
        { name: "Midnight", hex: "#2e3642", images: [IMG.macbookAirKeyboard, IMG.macbookAirDisplay, IMG.macbookAirCiv] },
        { name: "Starlight", hex: "#ece5da", images: [IMG.macbookAirDisplay, IMG.macbookAirCiv, IMG.macbookAirKeyboard] },
        { name: "Silver", hex: "#e3e4e6", images: [IMG.macbookAirCiv, IMG.macbookAirDisplay, IMG.macbookAirKeyboard] },
      ],
      ["—"],
      999,
    ),
  },
  {
    slug: "ipad-pro-m5",
    category: "ipad",
    name: "iPad Pro M5",
    series: "iPad Pro",
    tagline: "Ultra Retina XDR с Tandem OLED, Apple Pencil Pro",
    featuredOnHome: false,
    specs: [
      { label: "Экран", value: "11″ / 13″ Ultra Retina XDR (Tandem OLED)" },
      { label: "Процессор", value: "M5, 9 ядер CPU / 10 GPU" },
      { label: "Память", value: "16 ГБ объединённой памяти" },
      { label: "Аксессуары", value: "Apple Pencil Pro, Magic Keyboard" },
    ],
    variants: makeVariants(
      "IPDP",
      [{ gb: 256, extraUsd: 0 }, { gb: 512, extraUsd: 200 }, { gb: 1024, extraUsd: 400 }],
      [
        { name: "Silver", hex: "#e3e4e6", images: [IMG.ipadProPencil, IMG.ipadProKeyboard, IMG.ipadProWifi] },
        { name: "Space Black", hex: "#2e2c2e", images: [IMG.ipadProKeyboard, IMG.ipadProPencil, IMG.ipadProWifi] },
      ],
      ["Wi-Fi", "Wi-Fi + Cellular"],
      999,
    ),
  },
  {
    slug: "ipad-air-m3",
    category: "ipad",
    name: "iPad Air M3",
    series: "iPad Air",
    tagline: "13″ или 11″, поддержка Magic Keyboard",
    featuredOnHome: false,
    specs: [
      { label: "Экран", value: "11″ / 13″ Liquid Retina" },
      { label: "Процессор", value: "M3, 8 ядер CPU / 9 GPU" },
      { label: "Аксессуары", value: "Magic Keyboard, Apple Pencil Pro" },
      { label: "Память", value: "8 ГБ объединённой памяти" },
    ],
    variants: makeVariants(
      "IPDA",
      [{ gb: 128, extraUsd: 0 }, { gb: 256, extraUsd: 100 }, { gb: 512, extraUsd: 300 }],
      [
        { name: "Blue", hex: "#93a8bd", images: [IMG.ipadAirKeyboard, IMG.ipadAirChip] },
        { name: "Purple", hex: "#b5a8cb", images: [IMG.ipadAirKeyboard, IMG.ipadAirChip] },
        { name: "Starlight", hex: "#ece5da", images: [IMG.ipadAirChip, IMG.ipadAirKeyboard] },
        { name: "Space Gray", hex: "#7d7d80", images: [IMG.ipadAirChip, IMG.ipadAirKeyboard] },
      ],
      ["Wi-Fi", "Wi-Fi + Cellular"],
      599,
    ),
  },
  {
    slug: "apple-watch-series-11",
    category: "watch",
    name: "Apple Watch Series 11",
    series: "Apple Watch",
    tagline: "Мониторинг давления, до 24 часов работы",
    featuredOnHome: false,
    specs: [
      { label: "Корпус", value: "Алюминий 42 / 46 мм" },
      { label: "Экран", value: "Always-On Retina" },
      { label: "Здоровье", value: "ЭКГ, уведомления о гипертонии, кислород" },
      { label: "Аккумулятор", value: "до 24 часов" },
    ],
    variants: makeVariants(
      "AWS11",
      [{ gb: null, extraUsd: 0 }],
      [
        { name: "Jet Black", hex: "#1c1c1e", images: [IMG.watchSeries11, IMG.watchNike] },
        { name: "Rose Gold", hex: "#e8b8a8", images: [IMG.watchNike, IMG.watchSeries11] },
        { name: "Silver", hex: "#e3e4e6", images: [IMG.watchSeries11, IMG.watchUltra] },
      ],
      ["GPS", "GPS + Cellular"],
      399,
    ),
  },
  {
    slug: "apple-watch-ultra-3",
    category: "watch",
    name: "Apple Watch Ultra 3",
    series: "Apple Watch",
    tagline: "49 мм, титан, спутниковая связь",
    featuredOnHome: false,
    specs: [
      { label: "Корпус", value: "Титан 49 мм, 100 м водозащита" },
      { label: "Экран", value: "Retina до 3000 нит" },
      { label: "Связь", value: "Спутник, LTE" },
      { label: "Аккумулятор", value: "до 42 часов" },
    ],
    variants: makeVariants(
      "AWU3",
      [{ gb: null, extraUsd: 0 }],
      [{ name: "Natural Titanium", hex: "#b7b2ab", images: [IMG.watchUltra, IMG.watchSeries11] }],
      ["GPS + Cellular"],
      799,
    ),
  },
  {
    slug: "airpods-pro-3",
    category: "airpods",
    name: "AirPods Pro 3",
    series: "AirPods",
    tagline: "Активное шумоподавление 2× лучше, перевод в реальном времени",
    featuredOnHome: false,
    specs: [
      { label: "Шумоподавление", value: "Активное, вдвое лучше Pro 2" },
      { label: "Прослушивание", value: "Тест слуха, помощник слуха" },
      { label: "Автономность", value: "до 8 часов с кейсом 24 часа" },
      { label: "Особенность", value: "Пульсометр при тренировках" },
    ],
    variants: makeVariants(
      "APP3",
      [{ gb: null, extraUsd: 0 }],
      [{ name: "White", hex: "#f2f2f2", images: [IMG.airpodsPro3Lifestyle, IMG.airpodsPro3Second, IMG.airpodsPro3Hearing] }],
      ["Lightning → USB-C кейс"],
      249,
    ),
  },
  {
    slug: "magsafe-cases",
    category: "accessories",
    name: "Чехлы и MagSafe-аксессуары",
    series: "Аксессуары",
    tagline: "Чехлы MagSafe, зарядки и кабели для iPhone 15–17",
    featuredOnHome: false,
    specs: [
      { label: "Совместимость", value: "iPhone 15, 16, 17 (включая Pro и Air)" },
      { label: "Материалы", value: "Силикон, ткань, прозрачный поликарбонат" },
      { label: "MagSafe", value: "Магнитное крепление, беспроводная зарядка" },
    ],
    variants: makeVariants(
      "ACCS",
      [{ gb: null, extraUsd: 0 }],
      [
        { name: "Black", hex: "#1d1d1f", images: [IMG.iphone15FineWoven] },
        { name: "Taupe", hex: "#cbbfae", images: [IMG.iphone15FineWoven] },
        { name: "Pacific Blue", hex: "#4a6e8a", images: [IMG.iphone15FineWoven] },
      ],
      ["—"],
      49,
    ),
  },
];

export const usedUnits: UsedUnit[] = [
  {
    id: "U-1024",
    slug: "used-iphone-14-pro",
    name: "iPhone 14 Pro",
    storageGb: 256,
    colorName: "Deep Purple",
    condition: "good",
    conditionNote: "Мелкие потёртости на рамке, экран без царапин",
    batteryHealth: 89,
    batteryReplaced: false,
    kit: ["Кабель USB-C", "Без коробки"],
    checks: ["Face ID", "Дисплей", "Камеры", "Динамики", "Микрофоны", "Аккумулятор"],
    defects: "Заметная потёртость на нижней грани",
    warrantyMonths: 6,
    priceUsd: 549,
    // TODO: заменить на реальные фото экземпляра U-1024 (сейчас — официальные фото iPhone 14 Pro из пресс-кита Apple)
    images: [IMG.iphone14ProFitness, IMG.iphone14ProBw, IMG.iphone14ProColor],
  },
  {
    id: "U-1027",
    slug: "used-iphone-15",
    name: "iPhone 15",
    storageGb: 128,
    colorName: "Blue",
    condition: "excellent",
    conditionNote: "Без следов использования, использовался с чехлом",
    batteryHealth: 96,
    batteryReplaced: false,
    kit: ["Коробка", "Кабель USB-C", "Документы"],
    checks: ["Face ID", "Дисплей", "Камеры", "Динамики", "Микрофоны", "Аккумулятор"],
    defects: null,
    warrantyMonths: 9,
    priceUsd: 559,
    images: [IMG.iphone15ColorLineup, IMG.iphone15Design, IMG.iphone15Camera],
  },
  {
    id: "U-1031",
    slug: "used-iphone-16-pro",
    name: "iPhone 16 Pro",
    storageGb: 128,
    colorName: "Natural Titanium",
    condition: "excellent",
    conditionNote: "Состояние нового, куплен 7 месяцев назад",
    batteryHealth: 98,
    batteryReplaced: false,
    kit: ["Коробка", "Кабель USB-C", "Документы", "Чехол в подарок"],
    checks: ["Face ID", "Дисплей", "Камеры", "Динамики", "Микрофоны", "Аккумулятор"],
    defects: null,
    warrantyMonths: 12,
    priceUsd: 769,
    images: [IMG.iphone16ProFinish, IMG.iphone16ProMacro, IMG.iphone16ProFusion],
  },
];
