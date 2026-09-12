# ВайбМІ — landing page

Demo landing page for **ВайбМІ**, a Telegram Mini App.
Plain static HTML/CSS — no build step, no dependencies.

    index.html    the page
    styles.css    design tokens + layout
    script.js     hides a clip's play badge once the video actually plays
    robots.txt    search-engine policy (see below)
    assets/       brand icon, the handwritten-recipe photo, app screens, app videos
    tools/        scripts that capture the screens and videos from the running app

## The name

The product is **ВайбМІ** (ADR-180). The wordmark is one word with **МІ** carrying the
accent. `@SmachnoYe_bot` keeps its old username on purpose — every share link, studio
invite and ticket QR points at it — so the CTA links here are correct as they are. The
repository and the Railway domain keep the old name for the same reason: they identify
the project rather than name it to anyone.

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

## What is on the page

The three things the app does, in the app's own order (ADR-177):

- **Рецепти** — a collection built from links, reels, a photo of a handwritten page or a voice
  note, plus the agent that reads the last shopping and proposes dishes from that collection.
- **Покупки** — one list grouped by aisle, and the Silpo cart with the total and the checkout.
- **Для тебе** — sport studios near the guest's address, a −15% ticket valid 48 hours,
  confirmed by the studio in the bot. Studios on the screens are labelled «Демо» because they
  are examples and do not exist; the page says so where they appear.

## Screens and videos are real

Every phone screen is a capture of the running app at 390×844 @2x, taken against a local
instance in `SIM_MODE=1` seeded through the app's own onboarding — so the recipes, thumbnails,
list and cart are real app data, not mockups. The two videos are the app's own reels, recorded
from the same instance: the ten-scene app video shown at onboarding, and «Як працюють квитки».

Re-capture them with `tools/` when the app changes — see `tools/README.md`.

## Design

Follows the app's own tokens (`frontend/src/ui/tokens.css`): Electric Iris `#6b3df5` as the one
filled action colour, `#8b5cf6` as its second tint, `#12805f` for positive figures, text
`#0b0b0f` on white with `#f4f4f6` as the quiet surface. No shadows anywhere, 26px radii, and
Nunito Sans standing in for the display face. Ukrainian, in «ти».

## Run it locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Links

- Bot — https://t.me/SmachnoYe_bot
- App — https://smachnoyesilpo-production.up.railway.app
- App source — https://github.com/Katerina333/VibeMI
