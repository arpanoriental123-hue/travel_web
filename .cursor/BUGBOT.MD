# Project context
Travellrr is a static HTML/CSS/vanilla-JS travel site. No backend, no bundler.
Pages: index.html, aboutus.html, tours.html, login.html.
JS in js/ (booking-modal.js, currency.js, theme.js, login.js, script.js).
CSS in css/ (style.css, about.css, tours.css, login.css, booking-modal.css).
Hosted via GitHub Pages (.github/workflows/pages.yml). Lint CI: HTMLHint + Stylelint.

# Prioritize
- XSS: any `innerHTML` / `outerHTML` / `document.write` with non-static data,
  especially in `js/booking-modal.js` where we render the booking modal and
  read `card.querySelector('h3').textContent` and `data-price-inr` into the DOM.
- Unsafe links: `target="_blank"` missing `rel="noopener noreferrer"`.
- A11y: missing `alt` on `<img>`, missing `<label for>` on inputs, duplicate
  `id`s across pages, non-descriptive link text, h1->h3 skips.
- SEO: missing `<title>`, `<meta name="description">`, canonical, Open Graph
  on top-level pages.
- Performance: `<img>` without `width`/`height`, missing `loading="lazy"` on
  below-the-fold images, render-blocking `<script>` in `<head>` without
  `defer`/`async`, oversized assets in `images/`.
- JS hygiene: `var`, `==`, leftover `console.log` / `debugger`, `eval` /
  `new Function`, unhandled `fetch` rejections, parseFloat radix mistakes
  (we have `parseFloat(str, 10)` in booking-modal.js — flag misuse).
- Broken refs: inline `onclick="..."` referencing functions not defined in
  any js/ file in the diff or repo.
- Currency: `js/currency.js` uses hardcoded INR rates — flag stale/missing
  codes and any unguarded `Number(...)` of user-controlled values.

# Deprioritize
- Subjective CSS style preferences (no preprocessor in use).
- Prose / copy-only edits.
- Whitespace-only changes.

# Conventions
- Plain ES2020, no modules. Scripts loaded with `defer` where possible.
- Currency events dispatched via `travellrr:currency`.
- Booking modal is created lazily and reused (see `createModal()` in
  `js/booking-modal.js`).
