const { config } = require("./config");
const { log } = require("./log");
const { executeCommand, which } = require("./shell");

const AUDIO_SWITCHER = "SwitchAudioSources";
const {
  AUDIO_POST_MEETING_IN,
  AUDIO_POST_MEETING_OUT,
  AUDIO_PRE_MEETING_IN,
  AUDIO_PRE_MEETING_OUT,
} = config;

const makeCommand = (device, isInput) =>
  `${AUDIO_SWITCHER} -t ${isInput ? "input" : "output"} -s "${device}"`;

const beHeadset = async isHeadset => {
  if (!which(AUDIO_SWITCHER)) {
    console.error(`Missing ${AUDIO_SWITCHER} that is used to toggle audio`);

    return;
  }

  try {
    if (isHeadset) {
      log("Setting audio to headset...");
      await executeCommand(makeCommand(AUDIO_PRE_MEETING_IN, true));
      await executeCommand(makeCommand(AUDIO_PRE_MEETING_OUT));

      return;
    }

    log("Setting audio to laptop...");
    await executeCommand(makeCommand(AUDIO_POST_MEETING_IN, true));
    await executeCommand(makeCommand(AUDIO_POST_MEETING_OUT));
  } catch (e) {
    console.log(e);
  }
};

module.exports = { beHeadset };
