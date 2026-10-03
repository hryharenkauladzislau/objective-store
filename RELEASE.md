# Evgeniy Apple — black storefront and full Trade-in configuration
Source: b5dd961

Pure black default canvas, neutral gray surfaces, zero letter spacing throughout. Existing saved green default is migrated to black while custom accent colors and merchant content remain intact.

Enlarged logo, header, contact typography and all eight navigation links. Intermediate desktop widths use a separate navigation row to avoid clipping; mobile menu remains accessible. Shipping, warranty and repair now fill the content width with larger text and responsive service panels.

Trade-in selects target model, memory, color and SIM from actual published catalog variants. Parent selection changes clear dependent values and prevent invalid combinations; out-of-stock variants are omitted. Preview photo and price follow the selected variant. Manager draft includes model, memory, color, SIM and current variant price with no website links. Help choosing a phone remains available. No request is sent during verification.

Original local iPhone 17 Pro footage and posters remain, including static/reduced-motion fallback. Built-in older concept device-study images are replaced by these actual-device posters; merchant custom assets remain intact. Offscreen animation suspension, lazy map and no eager product prefetch are retained.

Verification: ESLint, TypeScript, production build, 17 API regression groups and 18 routes. Live UI verification follows publication.

Production source is evgeniy-release.tar.gz extracted by Dockerfile; root files are older prototype. No credentials, local catalogs or uploaded private media in release.
