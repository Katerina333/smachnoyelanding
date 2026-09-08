const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'landing');
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true, userDataDir: path.join(__dirname, '.chrome-profile'),
    args: ['--no-sandbox', '--hide-scrollbars', '--font-render-hinting=none', '--disable-gpu'],
  });

  for (const [name, w, h, dsf] of [['desktop', 1280, 900, 1], ['mobile', 390, 844, 2]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: dsf });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2', timeout: 60000 });
    // force every lazy image to load, then wait for them
    await page.evaluate(async () => {
      for (const i of document.images) i.loading = 'eager';
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 1500));
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map(i => i.complete ? null :
        new Promise(res => { i.onload = i.onerror = res; })));
    });
    await sleep(2500);
    const broken = await page.evaluate(() =>
      [...document.images].filter(i => i.naturalWidth === 0).map(i => i.src.split('/').pop()));
    console.log(name, '| height', await page.evaluate(() => document.body.scrollHeight),
                '| broken:', broken.length ? broken : 'none');
    await page.screenshot({ path: path.join(OUT, name + '-full.png'), fullPage: true });
    await page.close();
  }
  await browser.close();
  console.log('done ->', OUT);
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
