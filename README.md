# СмачноЄ — landing page

Demo landing page for **СмачноЄ**, a Telegram Mini App built for the Silpo AI Factory
hackathon. Plain static HTML/CSS — no build step, no dependencies.

    index.html    the page
    styles.css    design system + layout
    robots.txt    search-engine policy (see below)
    assets/       favicon, the handwritten-recipe photo, app screenshots

## Kept out of search — on purpose

This page exists to demo the project, not to be found. De-indexing is done by the meta tag
in `index.html`:

```html
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">
```

`robots.txt` deliberately **allows** crawling. That is not an oversight: a `Disallow: /` would
stop Googlebot from fetching the page, so it would never read the `noindex` above, and the bare
URL could still surface in results. Do not add a `Disallow` rule unless you also remove the
meta tag.

There is no sitemap, and nothing here should be submitted to Search Console.

## Screenshots

Every phone screenshot is a real screen from the running app, captured at 390×844 @2x
(780×1688) against a local instance in `SIM_MODE=1`, seeded through the app's own onboarding
so the recipes, images, plan and grocery list are genuine app data — not mockups.

The one photograph (`assets/handwritten-recipe.jpg`) is a real page from a handwritten
recipe notebook, shown as an example of what you can send the bot. The "from paper to a card"
section states in the page itself that its two halves are two separate real examples rather
than one single run.

## Design

Follows `DESIGN(2).md`: white canvas, Fog `#f5f5f5` alternate surface, Ember Orange
`#ff5406` brand accent, Verdant Green `#00b33f` for the achievement headline, Graphite
`#2f2f2f` text, 26px radii everywhere, no shadows, 96px section gaps, 1200px max width.
Nunito Sans stands in for Aquawax Pro, as the reference recommends.

Ukrainian only — the same language as the app.

## Run it locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Links

- Bot — https://t.me/SmachnoYe_bot
- App — https://smachnoyesilpo-production.up.railway.app
- App source — https://github.com/Katerina333/SmachnoYe_Silpo
