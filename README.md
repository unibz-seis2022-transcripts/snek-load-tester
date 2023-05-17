# Snek load tester

A puppeteer-based project to generate load on the AWS cloud-based snake browser game, deployed for the cloud computing course.

## Get started

1. Install node.js and npm, with version as specified in the `engine` field of `package.json`
2. Install dependencies with `npm i`
3. Copy `.env.example` to `.env` and change config values as desired
  1. Set path of `CHROMIUM_EXECUTABLE_PATH` properly.
  2. Set URL (don't forget `http://` prefix and port for `URL`)
4. Run app by executing `npm run start
