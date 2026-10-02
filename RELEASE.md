# Evgeniy Apple — packaged release

Source revision: `fb0826b5b010aa2f8d8eb4814eaa19aeb0cb56c6`. The complete tested source is in `evgeniy-release.tar.gz`, with no credentials, node_modules or generated Next output.

The Dockerfile builds this release in `/app`; it does not build the older prototype files at repository root. Railway uses `railway.json` and checks `/api/health`.

For source development, extract the archive into an empty folder: `tar -xzf evgeniy-release.tar.gz -C <empty-folder>`. Run `npm ci` there. Read `docs/DELIVERY.md` for admin and deployment instructions.

Production requires `DATABASE_URL` or a persistent volume with `STORAGE_DIR`, plus `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`. Set credentials in Railway Variables, never commit them.

Validated: lint, TypeScript/production build and 33 browser/API scenarios. Trade-in numbers are public RUB reference ceilings pending merchant approval.

This release adds the presentation editor, Telegram source archive (93 historical offers dated 2025-08-05), and continuous carousel motion on hover with desktop dragging and arrows. Historical source prices are not current store prices.
