const commander = require("commander");
const os = require("os");
const path = require("path");
const { name, version } = require("../package.json");
const { TUPLE, ZOOM } = require("./meetingType");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const args = new commander.Command();

args
  .name(name)
  .version(version)
  .option(
    `-g --google-calendar-id`,
    `Your Google Calendar id to log your meetings`
  )
  .option(`-i --ifttt-key`, `Your IFTTT maker key to use`)
  .option(`-k --slack-key`, `Your Slack api key`)
  .option(`-s --start`, `Flag to start a meeting. Otherwise end a meeting`)
  .option(
    `-t --meeting-type <zoom or tuple>`,
    `The type of meeting. Either zoom or tuple values are accepted`
  )
  .option(`-v --verbose`, `Flag for verbose logging`)
  .parse(process.argv);

const config = {
  GOOGLE_CALENDAR_ID: args.googleCalendarId || process.env.GOOGLE_CALENDAR_ID,
  IFTTT_MAKER_KEY: args.iftttKey || process.env.IFTTT_MAKER_KEY,
  IS_STARTING: Boolean(args.start),
  SLACK_API_TOKEN: args.slackKey || process.env.SLACK_API_TOKEN,
  MEETING_TYPE: args.meetingType === TUPLE ? TUPLE : ZOOM,
  VERBOSE: Boolean(args.verbose),
};

if (config.VERBOSE) {
  console.log(`\n${JSON.stringify(config, null, 2)}`);
}

config.APP_TMP_DIR = `${os.homedir()}/.${name}`;

module.exports = { config, TUPLE, ZOOM };
