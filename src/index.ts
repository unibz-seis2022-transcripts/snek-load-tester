import 'dotenv/config';
import puppeteer, { Browser } from 'puppeteer';
import * as dotenv from 'dotenv';
import getConfig from './config.js';
import {
  trackConnectedPlayer,
  trackDisconnectedPlayer,
  writeDataPointsToCsv,
} from './timeseries.js';

const connectPlayer = async (
  browser: Browser,
  connectDelayMs: number,
  playerName: string = 'testplayer',
) => {
  console.log('Connect new player, delay is ', connectDelayMs);
  const url = getConfig().url;

  await new Promise((r) => setTimeout(r, connectDelayMs));

  const page = await browser.newPage();

  // TODO (LS-2023-05-17): Make sure that interactions are executed even with tab unfocused
  await page.bringToFront();
  await page.goto(url);
  await page.type('#username', playerName);
  await page.click('#connect');
  console.log('Player connected');
  trackConnectedPlayer();

  await new Promise((r) => setTimeout(r, 10000));

  await page.close();

  console.log('Player disconnected');
  trackDisconnectedPlayer();
};

const createPromises = (browser: Browser) => {
  const promises: Promise<void>[] = [];
  let cumulativeConnectDelay = 0;
  for (let i = 0; i < getConfig().playerCount; i++) {
    const promise = connectPlayer(browser, cumulativeConnectDelay);
    promises.push(promise);
    cumulativeConnectDelay += getConfig().connectDelayMs;
  }

  return promises;
};

const run = (async () => {
  dotenv.config();

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: getConfig().chromiumExecutablePath,
  });

  const promises = createPromises(browser);

  await Promise.all(promises);
  await browser.close();
  writeDataPointsToCsv();
})();

export default run;
