# Evgeniy Apple — official product footage and staged motion
Source: a4d3a60

The hand-built CSS phone is removed everywhere. Hero and Trade-in now use locally served original iPhone 17 Pro footage from Apple's public product page. Black backgrounds blend into the dark canvas (not true alpha video). Forward/reverse loops use real frames only and total less than 500 KB. Static posters cover autoplay failure and reduced motion; playback pauses when offscreen or the tab is hidden.

Added typography cascade, staggered card and service reveals, photo reveal, hero parallax and CTA feedback without changing the merchant's palette or section order.

The moving hero and Trade-in artwork use their own merchant-canvas backdrop for reliable screen blending. Films stay inside that backdrop. Decorative oversized words are omitted behind the films to avoid showing through the real devices.

All enabled CMS home sections, order, custom imagery, merchant copy, theme colors, links, products, prices, category management, cart/request/Trade-in logic and admin APIs preserved. The existing four-step Trade-in target-device selection remains unchanged.

Verification: ESLint, TypeScript, production build, 17 API regression groups including 18 routes, category/SALE lifecycle, TXT/Excel prices, photo persistence and Trade-in. Live visual/workflow verification follows deployment.
Sources, processing and commercial-use permission caveat are included in docs/OFFICIAL-MOTION-ASSETS.md. Public availability is not a commercial-use licence. No reconstructed or AI-generated iPhone geometry added; no invented prices or stock.

Production source is evgeniy-release.tar.gz extracted by Dockerfile; root files are older prototype. No credentials in release.
