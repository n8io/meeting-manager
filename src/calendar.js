// Copy/pasta'd from https://developers.google.com/calendar/quickstart/nodejs
const { google } = require("googleapis");
const readline = require("readline");
const { config } = require("./config");
const { mkDir, readJson, writeJson } = require("./fs");
const { log } = require("./log");
const { TUPLE, ZOOM } = require("./meetingType");

const { APP_TMP_DIR, GOOGLE_CALENDAR_ID } = config;
const CALENDAR_DIR = `${APP_TMP_DIR}/google`;

const CREDENTIALS_PATH = `${CALENDAR_DIR}/credentials.json`;
const EVENT_PATH = `${CALENDAR_DIR}/event.json`;

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = `${CALENDAR_DIR}/token.json`;

// If modifying these scopes, delete token.json from CALENDAR_DIR above.
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

const getAccessToken = oAuth2Client => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return new Promise((resolve, reject) => {
    log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the code from that page here: ", code => {
      rl.close();
      oAuth2Client.getToken(code, async (err, token) => {
        if (err) {
          console.error("Error retrieving access token", err);

          return reject(err);
        }

        oAuth2Client.setCredentials(token);

        await mkDir(CALENDAR_DIR);
        // Store the token to disk for later program executions
        await writeJson(TOKEN_PATH, token);

        return resolve(oAuth2Client);
      });
    });
  });
};

const authorize = async () => {
  try {
    const { installed } = await readJson(CREDENTIALS_PATH);
    const { client_secret, client_id, redirect_uris } = installed;

    // Authorize a client with credentials
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    try {
      const token = await readJson(TOKEN_PATH);

      oAuth2Client.setCredentials(token);

      return oAuth2Client;
    } catch (noToken) {
      return getAccessToken(oAuth2Client);
    }
  } catch (noCredentials) {
    console.error(`
    No credentials file located at: ${CREDENTIALS_PATH}
    Generate one from here: https://developers.google.com/calendar/quickstart/nodejs
    `);

    return null;
  }
};

const validate = async () => {
  if (!GOOGLE_CALENDAR_ID) {
    const err = `No GOOGLE_CALENDAR_ID was provided`;

    throw new Error(err);
  }

  return authorize();
};

const createEvent = async event => {
  const auth = await validate();

  if (!auth) return false;

  const calendar = google.calendar({ version: "v3", auth });

  return new Promise((resolve, reject) => {
    calendar.events.insert(
      { calendarId: GOOGLE_CALENDAR_ID, resource: event },
      (err, event) => {
        if (err) {
          return reject(err);
        }

        return resolve(event);
      }
    );
  });
};

const logEnd = async () => {
  const now = new Date();
  const start = await readJson(EVENT_PATH);

  const event = {
    ...start,
    end: {
      dateTime: now.toISOString(),
    },
  };

  await writeJson(EVENT_PATH, event);

  return createEvent(event);
};

const logStart = async meetingType => {
  const now = new Date();

  await mkDir(CALENDAR_DIR);
  let summary = null;
  let location = null;

  switch (meetingType) {
    case TUPLE:
      location = "https://production.tuple.app";
      summary = "Tuple";
      break;
    case ZOOM:
      location = "https://zoom.us";
      summary = "Zoom";
      break;
    default:
      location = undefined;
      summary = "Unknown";
      break;
  }

  const event = {
    location,
    start: {
      dateTime: now.toISOString(),
    },
    summary: `🎧 ${summary}`,
  };

  return writeJson(EVENT_PATH, event);
};

module.exports = { CALENDAR_DIR, createEvent, logEnd, logStart };
