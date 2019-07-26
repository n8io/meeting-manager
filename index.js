const { beHeadset: beHeadsetAudio } = require("./src/audio");
const { config } = require("./src/config");
const { beOn: beOnAir } = require("./src/onAirLight");
const { updateStatus: updateSlackStatus } = require("./src/slack");
const { bePaused: beMusicPaused } = require("./src/spotify");

const { IS_STARTING: isMeetingStarting } = config;

const startMeeting = () =>
  Promise.all([
    beHeadsetAudio(isMeetingStarting),
    beOnAir(isMeetingStarting),
    beMusicPaused(isMeetingStarting),
    updateSlackStatus(isMeetingStarting),
  ]);

const endMeeting = () =>
  Promise.all([
    beHeadsetAudio(isMeetingStarting),
    beOnAir(isMeetingStarting),
    beMusicPaused(isMeetingStarting),
    updateSlackStatus(isMeetingStarting),
  ]);

(async () => {
  if (isMeetingStarting) {
    return startMeeting();
  }

  return endMeeting();
})();
