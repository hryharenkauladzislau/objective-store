# Verified source release — 2026-10-02

Source revision: `5d43495007fbf6b560e7c71266563e220fe87654` on design-prototype.

The deployment Dockerfile extracts evgeniy-release.tar.gz; root prototype directories are not the deployment source.

Changes: charcoal/gold dark storefront and admin; link-free Telegram purchase/service/Trade-in requests; no copy fallback, decorative arrows or carousel instructions; visible mobile question dock; equal comparison cards; memory/color variant selection; validated TXT import/export for every SKU with the price as the final number. Trade-in exposes only approved merchant prices in BYN/USD. Legacy Russian research prices are not public estimates.

Validation: ESLint, TypeScript, Next production build, 39 Chromium browser/API checks across 18 routes passed. Includes authenticated TXT preview/application, malformed and stale file rejection, variant-specific price changes, categories, SALE, media, CMS, Telegram texts and Trade-in BYN. No browser runtime errors.

No credentials are included. Existing PostgreSQL catalogue/media and admin environment variables are retained on deployment.
