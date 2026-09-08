# Screenshot tooling

The phone screens in `assets/screens/` are real captures of the running app, not mockups.
Re-run these when the app's UI changes.

## Setup (once)

```bash
cd tools && npm init -y && npm i puppeteer-core
```

`puppeteer-core` drives the Chrome already installed on the machine — it downloads no browser.

## 1. Start the app locally

From the **SmachnoYe_Silpo** repo, on SQLite so Docker/Postgres is not needed:

```bash
set -a; . ./.env; set +a
export DATABASE_URL="sqlite+pysqlite:///$PWD/demo.db" DEV_AUTH_BYPASS=1 SIM_MODE=1
.venv/bin/python -m uvicorn backend.main:app --port 8009
```

Then open `http://localhost:8009/app?dev=880202&theme=light` once and walk through onboarding,
picking the dishes — that is what fills the collection with real recipes and real thumbnails.

To fill the plan and the grocery list (otherwise those screens are empty), call the API with the
dev header:

```bash
curl -X POST -H 'X-Dev-Tg-User-Id: 880202' -H 'Content-Type: application/json' \
  -d '{"recipe_ids":[16,15,14],"servings":4}' http://localhost:8009/api/list/recipes

curl -X POST -H 'X-Dev-Tg-User-Id: 880202' -H 'Content-Type: application/json' \
  -d '{"recipe_id":16,"day":0,"meal_slot":null}' http://localhost:8009/api/plans/current/meals
```

Recipe ids come from `GET /api/recipes` with the same header.

## 2. Capture

```bash
node tools/capture-screens.js       # app screens -> tools/final/*.png at 390x844 @2x
```

Then convert and install the ones you want:

```bash
magick tools/final/library.png -quality 86 -sampling-factor 4:2:0 -strip assets/screens/library.jpg
```

## 3. Check the landing page itself

```bash
python3 -m http.server 4321
node tools/capture-landing.js       # full-page desktop + mobile renders, reports broken images
```

## Note

Headless Chrome loads the app's external thumbnails (YouTube, TikTok CDN) normally. Some
embedded preview panes block third-party hosts, which makes every recipe image look broken —
if that happens, it is the pane, not the app.
