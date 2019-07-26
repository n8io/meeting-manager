// API token https://api.slack.com/custom-integrations/legacy-tokens
const { WebClient } = require("@slack/web-api");
const os = require("os");
const { config } = require("./config");
const { log } = require("./log");
const { TUPLE, ZOOM } = require("./meetingType");
const { mkDir, readJson, writeFile } = require("./fs");

const { APP_TMP_DIR, MEETING_TYPE, SLACK_API_TOKEN } = config;
const SLACK_DIR = `${APP_TMP_DIR}/slack`;
const STATUS_FILE_PATH = `${SLACK_DIR}/status.json`;

const web = new WebClient(SLACK_API_TOKEN);

const fromSlack = ({
  status_text: text,
  status_emoji: emoji,
  status_expiration: expiration,
}) => ({
  text,
  emoji,
  expiration,
});

const toSlack = ({
  text: status_text,
  emoji: status_emoji,
  expiration: status_expiration,
}) => ({
  status_text,
  status_emoji,
  status_expiration,
});

const validate = () => {
  if (!SLACK_API_TOKEN) {
    const err = `No SLACK_API_TOKEN was provided`;

    throw new Error(err);
  }
};

const saveStatus = async () => {
  log("Fetching user status...");
  const { profile } = await web.users.profile.get();
  const { real_name: fullName } = profile;
  const status = fromSlack(profile);
  log(`${fullName}'s status ${JSON.stringify(status)}`);

  await mkDir(SLACK_DIR);
  await writeFile(STATUS_FILE_PATH, JSON.stringify(status));
};

const setStatus = async status => {
  log(`Setting user status...`);
  await web.users.profile.set({
    profile: toSlack(status),
  });
};

const resetStatus = async () => {
  log(`Resetting user status...`);
  const status = await readJson(STATUS_FILE_PATH);
  await setStatus(status);
};

const makeStatus = meetingType => {
  switch (meetingType) {
    case TUPLE:
      return {
        emoji: ":twr:",
        expiration: 0,
        text: "In a pairing session",
      };
    case ZOOM:
      return {
        emoji: ":zoom:",
        expiration: 0,
        text: "In a meeting",
      };
    default:
      return null;
  }
};

const updateStatus = async isMeetingStarting => {
  try {
    validate();

    if (isMeetingStarting) {
      await saveStatus();

      const status = makeStatus(MEETING_TYPE);

      await setStatus(status);
    } else {
      await resetStatus();
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = { updateStatus };
