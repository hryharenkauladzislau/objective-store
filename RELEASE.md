# Evgeniy Apple — packaged release

Source revision: `fb66e26`. The complete tested source is in `evgeniy-release.tar.gz`, with no credentials, node_modules or generated Next output.

The Dockerfile builds this release in `/app`; it does not build the older prototype files at repository root. Railway uses `railway.json` and checks `/api/health`.

For source development, extract the archive into an empty folder: `tar -xzf evgeniy-release.tar.gz -C <empty-folder>`. Run `npm ci` there. Read `docs/DELIVERY.md` for admin and deployment instructions.

Production requires `DATABASE_URL` or a persistent volume with `STORAGE_DIR`, plus `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`. Set credentials in Railway Variables, never commit them.

Validated: lint, TypeScript/production build and 25 browser/API scenarios. Trade-in numbers are public RUB reference ceilings pending merchant approval.
