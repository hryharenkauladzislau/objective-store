# Evgeniy Apple — native Telegram drafts and metallic brand accents
Source: b7b7c2c

Shared request links now use tg://resolve?domain=Evgeniy_apple&text= with exactly one percent-encoding pass. No HTTPS landing-page conversion, no blank browser target. Normalizes nonbreaking price spaces and truncates by Unicode codepoints. Applies to product requests, mobile purchase bar, used devices, Trade-in and service questions. Requires an installed Telegram client; native-app receipt cannot be proven in the cloud browser and should be checked on the merchant's device. No test request is sent.

Hero title: Лучшая оригинальная техника Apple и не только в Минске
Hero kicker: Evgeniy Apple - Original Apple Equipment
Existing subtitle remains unchanged. Saved old default hero copy is upgraded; merchant custom copy remains editable. Static metallic gradients use colors sampled from the supplied EA logo for buttons and text accents. No continuous gradient animation.

Black background, zero tracking, enlarged responsive header, service panels and catalog-driven Trade-in configurations remain. Prior offscreen animation suspension, lazy map and no eager product prefetch remain. No changes to catalog pricing, categories, stock, merchant settings or media storage.

Verification: native-link Unicode/delimiter regression, ESLint, TypeScript, production build, 17 API regression groups, 18 routes. Live DOM/visual verification follows deployment. Telegram format reference: https://core.telegram.org/api/links#public-username-links

Production source is evgeniy-release.tar.gz extracted by Dockerfile; root files are older prototype. No credentials in release.
