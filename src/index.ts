import 'dotenv/config';
import puppeteer, { Browser } from 'puppeteer';
import * as dotenv from 'dotenv';
import getConfig from './config.js';
import {
  endTimeTrackingInterval,
  trackConnectedPlayer,
  trackDisconnectedPlayer,
  writeDataPointsToCsv,
} from './timeseries.js';
import { PlayerConfig, demoPlayers } from './playerConfig.js';

const connectPlayer = async (browser: Browser, playerConfig: PlayerConfig) => {
  const playerName = playerConfig.name || 'testplayer';
  const { connectDelay, disconnectDelay } = playerConfig;

  console.log(
    `Add player ${playerName}, connect delay: ${connectDelay}, disconnect delay: ${disconnectDelay}`,
  );
  const url = getConfig().url;

  await new Promise((r) => setTimeout(r, connectDelay));

  const page = await browser.newPage();

  // TODO (LS-2023-05-17): Make sure that interactions are executed even with tab unfocused
  await page.bringToFront();
  await page.goto(url);
  await page.type('#username', playerName);
  await page.click('#connect');
  console.log('Player connected');
  trackConnectedPlayer();

  await new Promise((r) => setTimeout(r, disconnectDelay));

  await page.close();

  console.log('Player disconnected');
  trackDisconnectedPlayer();
};

const createPromises = (browser: Browser) => {
  const promises: Promise<void>[] = demoPlayers.map((player) =>
    connectPlayer(browser, player),
  );

  return promises;
};

const run = (async () => {
  dotenv.config();

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: getConfig().chromiumExecutablePath,
    args: ['--disable-dev-shm-usage'],
  });

  const promises = createPromises(browser);

  await Promise.all(promises);
  await browser.close();
  writeDataPointsToCsv();
  endTimeTrackingInterval();
})();

export default run;
