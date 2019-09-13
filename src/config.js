const commander = require("commander");
const os = require("os");
const path = require("path");
const { name, version } = require("../package.json");
const MeetingType = require("./meetingType");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const args = new commander.Command();

const AUDIO_SWITCHER = "SwitchAudioSource";
const listAudioDevices = `Use "${AUDIO_SWITCHER} -a" to list available audio devices`;

args
  .name(name)
  .version(version)
  .option(
    `-apoi --audio-post-meeting-in`,
    `The input audio device to switch to after a meeting. ${listAudioDevices}`
  )
  .option(
    `-apoo --audio-post-meeting-out`,
    `The ouput audio device to switch to after a meeting. ${listAudioDevices}`
  )
  .option(
    `-apri --audio-pre-meeting-in`,
    `The input audio device to switch to during a meeting. ${listAudioDevices}`
  )
  .option(
    `-apro --audio-pre-meeting-out`,
    `The ouput audio device to switch to during a meeting. ${listAudioDevices}`
  )
  .option(
    `-g --google-calendar-id`,
    `Your Google Calendar id to log your meetings`
  )
  .option(`-i --ifttt-key`, `Your IFTTT maker key to use`)
  .option(`-k --slack-key`, `Your Slack api key`)
  .option(`-kt --slack-emoji-tuple`, `Your Slack emoji for Tuple pairing`)
  .option(`-kz --slack-emoji-zoom`, `Your Slack emoji for Zoom meetings`)
  .option(`-s --start`, `Flag to start a meeting. Otherwise end a meeting`)
  .option(
    `-t --meeting-type <zoom or tuple>`,
    `The type of meeting. Either zoom or tuple values are accepted`
  )
  .option(`-v --verbose`, `Flag for verbose logging`)
  .parse(process.argv);

const config = {
  AUDIO_POST_MEETING_IN:
    args.audioPostMeetingIn || process.env.AUDIO_POST_MEETING_IN,
  AUDIO_POST_MEETING_OUT:
    args.audioPostMeetingOut || process.env.AUDIO_POST_MEETING_OUT,
  AUDIO_PRE_MEETING_IN:
    args.audioPreMeetingIn || process.env.AUDIO_PRE_MEETING_IN,
  AUDIO_PRE_MEETING_OUT:
    args.audioPreMeetingOut || process.env.AUDIO_PRE_MEETING_OUT,
  GOOGLE_CALENDAR_ID: args.googleCalendarId || process.env.GOOGLE_CALENDAR_ID,
  IFTTT_MAKER_KEY: args.iftttKey || process.env.IFTTT_MAKER_KEY,
  IS_STARTING: Boolean(args.start),
  SLACK_API_TOKEN: args.slackKey || process.env.SLACK_API_TOKEN,
  SLACK_EMOJI_TUPLE: args.slackEmojiTuple || process.env.SLACK_EMOJI_TUPLE,
  SLACK_EMOJI_ZOOM: args.slackEmojiZoom || process.env.SLACK_EMOJI_ZOOM,
  MEETING_TYPE: args.meetingType && MeetingType[args.meetingType.toUpperCase()],
  VERBOSE: Boolean(args.verbose),
};

if (args.meetingType && !config.MEETING_TYPE) {
  console.error(
    `Invalid meeting type provided "${
      args.meetingType
    }". Must be one of the following: ${Object.values(MeetingType).join(", ")}`
  );

  return process.exit(1);
}

if (config.VERBOSE) {
  console.log(`\n${JSON.stringify(config, null, 2)}`);
}

config.AUDIO_SWITCHER = AUDIO_SWITCHER;
config.APP_TMP_DIR = `${os.homedir()}/.${name}`;

module.exports = { config };
