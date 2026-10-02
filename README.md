# EVGENIY APPLE — Railway release

Dark premium storefront and admin: configurable brands/categories/subcategories with artwork, model/variant prices «от», SALE, photo uploads, validated TXT price import/export, Excel, used devices, comparison, Trade-in, Instagram, map and website presentation editor.

**Deployment source is `evgeniy-release.tar.gz`.** Dockerfile extracts it into /app and builds it. Older prototype files at repository root are not used. See RELEASE.md for source revision and validation.

TXT prices: Admin → Цены → Скачать TXT. One line per memory/color/SIM variant; edit only the final USD number, upload, inspect the changes and apply. Model cards remain grouped. Malformed/stale files are rejected.

Telegram drafts target @Evgeniy_apple and contain no site/source URLs. Only approved BYN/USD Trade-in estimates are displayed. Public research figures are not merchant offers.

Railway: branch design-prototype, PostgreSQL DATABASE_URL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET and NEXT_PUBLIC_SITE_URL. Never commit credentials. Admin /admin; health /api/health. Source includes 39 browser/API verification scenarios.
