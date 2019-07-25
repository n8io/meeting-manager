const { beHeadset: beHeadsetAudio } = require("./src/audio");
const { config } = require("./src/config");
const { beOn: beOnAir } = require("./src/onAirLight");
const { updateStatus: updateSlackStatus } = require("./src/slack");
const { bePlaying: bePlayingMusic } = require("./src/spotify");

const { IS_STARTING: isMeetingStarting } = config;

const startMeeting = async () => {
  await beHeadsetAudio(isMeetingStarting);
  await bePlayingMusic(!isMeetingStarting);
  await updateSlackStatus(isMeetingStarting);
  await beOnAir(isMeetingStarting);
};

const endMeeting = async () => {
  await updateSlackStatus(isMeetingStarting);
  await beOnAir(isMeetingStarting);
  await beHeadsetAudio(isMeetingStarting);
  await bePlayingMusic(!isMeetingStarting);
};

(async () => {
  if (isMeetingStarting) {
    return startMeeting();
  }

  return endMeeting();
})();
