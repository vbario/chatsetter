// add‑tester.js
require('dotenv').config();
const puppeteer = require('puppeteer');

let email = process.env.FB_EMAIL
let password = process.env.FB_PASSWORD
let appId = process.env.FB_APP_ID;
let version = process.env.FB_GRAPH_VERSION


async function addInstagramTester(instaUsername) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  // 1) Log into Meta Developer portal
  await page.goto(`https://www.facebook.com/login`);
  await page.type(`#email`, email);
  await page.type(`#pass`, password);
  await page.click('#loginbutton');
  await page.waitForNavigation();

  // 2) Go to your app’s Roles → Instagram Testers tab
  await page.goto(`https://developers.facebook.com/apps/${appId}/roles/`);
  // 3) Wait for the Instagram‑testers input to show up
  await page.waitForSelector('input[aria-label="Add Instagram tester"]');

  // 4) Fill in the username and submit
  await page.type('input[aria-label="Add Instagram tester"]', instaUsername);
  await page.click('button[data-testid="add-instagram-tester-button"]');

  // 5) Optional: wait for confirmation UI
  await page.waitForResponse(res =>
    res.url().includes(`/v${version}/${appId}/roles`) &&
    res.status() === 200
  );

  console.log(`✓ Invited @${instaUsername} as a tester`);
  await browser.close();
}

exports.addInstagramTester = addInstagramTester

// Usage: `node add‑tester.js some_username`
// const usernameToAdd = process.argv[2];
// if (!usernameToAdd) {
//   console.error('Usage: node add‑tester.js <instagram_username>');
//   process.exit(1);
// }