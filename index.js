const { beHeadset: beHeadsetAudio } = require("./src/audio");
const { logEnd, logStart } = require("./src/calendar");
const { config } = require("./src/config");
const { beOn: beOnAir } = require("./src/onAirLight");
const { updateStatus: updateSlackStatus } = require("./src/slack");
const { bePaused: beMusicPaused } = require("./src/spotify");

const { IS_STARTING: isMeetingStarting, MEETING_TYPE: meetingType } = config;

const startMeeting = () =>
  Promise.all([
    logStart(meetingType),
    beHeadsetAudio(isMeetingStarting),
    beOnAir(isMeetingStarting),
    beMusicPaused(isMeetingStarting),
    updateSlackStatus(isMeetingStarting),
  ]);

const endMeeting = () =>
  Promise.all([
    logEnd(),
    beHeadsetAudio(isMeetingStarting),
    beOnAir(isMeetingStarting),
    beMusicPaused(isMeetingStarting),
    updateSlackStatus(isMeetingStarting),
  ]);

(async () => (isMeetingStarting ? startMeeting() : endMeeting()))();
