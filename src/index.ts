import 'dotenv/config';
import puppeteer, { Page } from 'puppeteer';
import * as dotenv from 'dotenv';
import getConfig from './config.js';

const connectToApp = async (page: Page, playerName: string = 'testplayer') => {
  const url = getConfig().url;

  await page.goto(url);
  await page.type('#username', playerName);
  await page.click('#connect');
};

const run = (async () => {
  dotenv.config();

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium-browser',
  });
  const page = await browser.newPage();

  await connectToApp(page);
  await new Promise((r) => setTimeout(r, 60000));
  await browser.close();
})();

export default run;
