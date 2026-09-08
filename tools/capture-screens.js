const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'final');
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const URL = 'http://localhost:8009/app?dev=880202&theme=light';
const head = p => p.evaluate(() => document.body.innerText.slice(0, 130).replace(/\n+/g, ' | '));

async function switchView(page, label) {
  await page.evaluate(() => document.querySelector('button.view-switch')?.click());
  await sleep(1100);
  const ok = await page.evaluate(l => {
    const o = [...document.querySelectorAll('button,[role=option],li')]
      .filter(x => x.textContent.trim() === l && !x.classList.contains('view-switch'));
    if (o.length) { o[o.length - 1].click(); return true; }
    return false;
  }, label);
  await sleep(2800);
  return ok;
}
async function tab(page, l) {
  await page.evaluate(x => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === x)?.click(), l);
  await sleep(3200);
}
async function shoot(page, name) {
  await sleep(1400);
  await page.screenshot({ path: path.join(OUT, name + '.png') });
  console.log('  ✓', name, '|', (await head(page)).slice(0, 95));
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true, userDataDir: path.join(__dirname, '.chrome-profile'),
    args: ['--no-sandbox', '--hide-scrollbars', '--font-render-hinting=none', '--disable-gpu'],
    defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();

  // library grid
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }); await sleep(3500);
  await switchView(page, 'Усі рецепти');
  await shoot(page, 'library');

  // folders
  await switchView(page, 'Папки');
  await shoot(page, 'folders');

  // a recipe card (borsch)
  await page.goto(URL, { waitUntil: 'networkidle2' }); await sleep(3000);
  await switchView(page, 'Усі рецепти');
  await page.evaluate(() => [...document.querySelectorAll('button')]
    .find(x => x.textContent.includes('Червоний борщ') && x.querySelector('img'))?.click());
  await sleep(4000);
  await shoot(page, 'recipe');
  await page.evaluate(() => window.scrollTo(0, 620));
  await shoot(page, 'recipe-ingredients');

  // a multi-dish post card
  await page.goto(URL, { waitUntil: 'networkidle2' }); await sleep(3000);
  await switchView(page, 'Усі рецепти');
  await page.evaluate(() => [...document.querySelectorAll('button')]
    .find(x => x.textContent.includes('Заготовки з курки') && x.querySelector('img'))?.click());
  await sleep(4000);
  await shoot(page, 'batch');

  // plan week
  await page.goto(URL, { waitUntil: 'networkidle2' }); await sleep(2800);
  await tab(page, 'План');
  await switchView(page, 'Тиждень');
  await shoot(page, 'plan');
  await tab(page, 'План');
  await switchView(page, 'Помічник');
  await shoot(page, 'plan-agent');

  // products
  await page.goto(URL, { waitUntil: 'networkidle2' }); await sleep(2800);
  await tab(page, 'Продукти');
  for (const v of ['Список', 'Список продуктів']) if (await switchView(page, v)) break;
  await shoot(page, 'list');
  await page.evaluate(() => window.scrollTo(0, 520));
  await shoot(page, 'list-aisles');
  await tab(page, 'Продукти');
  await switchView(page, 'Помічник');
  await shoot(page, 'shop-agent');

  await browser.close();
  console.log('done ->', OUT);
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
