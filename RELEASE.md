# Evgeniy Apple — official product footage and staged motion
Source: 5201d8c

The hand-built CSS phone is removed everywhere. Hero and Trade-in now use locally served original iPhone 17 Pro footage from Apple's public product page. Black backgrounds blend into the dark canvas (not true alpha video). Forward/reverse loops use real frames only and total less than 500 KB. Static posters cover autoplay failure and reduced motion; playback pauses when offscreen or the tab is hidden.

Added typography cascade, staggered card and service reveals, photo reveal, hero parallax and CTA feedback without changing the merchant's palette or section order.

The moving hero and Trade-in artwork use their own merchant-canvas backdrop for reliable screen blending. Films stay inside that backdrop. Decorative oversized words are omitted behind the films to avoid showing through the real devices.

Performance: carousel animation frames stop completely offscreen, on mobile, while paused/reduced-motion, and in hidden tabs. Loop geometry is cached via ResizeObserver, not queried per frame. Scroll geometry reads are batched before writes; pointer tilt is throttled to one frame, desktop only. Removed moving/blended hero parallax, continuous macro-photo breathing, animated photo clipping and sticky-header blur. Product cards no longer prefetch every product page. Yandex iframe loads only within 150px of view, rather than at the browser's distant lazy-load threshold.

All enabled CMS home sections, order, custom imagery, merchant copy, theme colors, links, products, prices, category management, cart/request/Trade-in logic and admin APIs preserved. The existing four-step Trade-in target-device selection remains unchanged.

Verification: ESLint, TypeScript, production build, 17 API regression groups including 18 routes, category/SALE lifecycle, TXT/Excel prices, photo persistence and Trade-in. Live visual/workflow verification follows deployment.
Sources, processing and commercial-use permission caveat are included in docs/OFFICIAL-MOTION-ASSETS.md. Public availability is not a commercial-use licence. No reconstructed or AI-generated iPhone geometry added; no invented prices or stock.

Production source is evgeniy-release.tar.gz extracted by Dockerfile; root files are older prototype. No credentials in release.
