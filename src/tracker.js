const { CALENDAR_DIR, createEvent } = require("./calendar");
const { mkDir, readJson, writeJson } = require("./fs");
const { TUPLE, ZOOM } = require("./meetingType");

const EVENT_PATH = `${CALENDAR_DIR}/event.json`;

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

module.exports = { logEnd, logStart };
