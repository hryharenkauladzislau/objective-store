# Evgeniy Apple — packaged release

Source revision: `177bd26e2e8797f7116b31eeee94c11768603fd6`. The complete tested source is in `evgeniy-release.tar.gz`, with no credentials, node_modules or generated Next output.

The Dockerfile builds this release in `/app`; it does not build the older prototype files at repository root. Railway uses `railway.json` and checks `/api/health`.

For source development, extract the archive into an empty folder: `tar -xzf evgeniy-release.tar.gz -C <empty-folder>`. Run `npm ci` there. Read `docs/DELIVERY.md` for admin and deployment instructions.

Production requires `DATABASE_URL` or a persistent volume with `STORAGE_DIR`, plus `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`. Set credentials in Railway Variables, never commit them.

Validated: lint, TypeScript/production build and 33 browser/API scenarios. Trade-in numbers are public RUB reference ceilings pending merchant approval.

This release adds the supplied Evgeniy Apple logo, premium brand → subcategory → model browsing, editable category imagery, Instagram/Yandex social proof, the interactive BC «Аякс» location panel and fully configurable Trade-in questionnaire. The seed uses the public new-device price snapshot dated 2026-09-26; every final price still requires confirmation because the channel states that prices can change during the day.
