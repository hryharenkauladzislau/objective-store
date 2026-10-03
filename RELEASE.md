# Evgeniy Apple — restore automatic Telegram checkout
Source: 0b19f78

Restore the original universal https://t.me/username?text=... checkout transport. Remove the Mac-specific text stripping, click interception and clipboard workaround from both request and purchase bar buttons. All platforms receive the normalized complete draft, encoded exactly once. Existing escaped legacy input is normalized before constructing the link.

This restores automatic draft intent; it does not prove delivery inside the user's native Mac Telegram. That client is unavailable in the cloud. Browser verification checks actual live link and selected variant payload only. The earlier claim that Mac inherently needs manual paste was not established.

iPhone 18 Pro footage, design, admin, catalog, pricing and Trade-in remain unchanged. No messages are sent automatically.

Validation: Telegram Unicode/legacy/automatic-draft regressions; lint; TypeScript; production build; 17 API groups and 18 routes passed. Live verification follows deployment.

Deployment source is evgeniy-release.tar.gz extracted by Dockerfile. No secrets included.
