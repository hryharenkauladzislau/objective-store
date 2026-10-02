# EVGENIY APPLE — Railway release

Complete store website and admin: catalog/configurator, categories, prices and SALE, photo uploads, Excel import/export, used units, comparison, Trade-in and site presentation editor.

**Deployment source is `evgeniy-release.tar.gz`.** Dockerfile extracts it into /app and builds it. Older prototype files at repository root are not used. See RELEASE.md for source revision and validation.

For development extract the archive into an empty folder and read its README.md and docs/DELIVERY.md.

Railway: select branch design-prototype, add PostgreSQL with DATABASE_URL, configure ADMIN_PASSWORD and ADMIN_SESSION_SECRET in Variables, then deploy. Never commit credentials. The admin route is /admin; health is /api/health.

The source archive includes 33 browser/API scenarios. Telegram historical offers and public Trade-in values have explicit dates and require merchant approval before use as current prices.
