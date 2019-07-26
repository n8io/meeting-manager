const { log } = require("./log");
const { executeCommand } = require("./shell");

const beHeadset = async isHeadset => {
  try {
    if (isHeadset) {
      log("Setting audio to headset...");
      await executeCommand(`SwitchAudioSource -t output -s "HyperX 7.1 Audio"`);
      await executeCommand(`SwitchAudioSource -t input -s "HyperX 7.1 Audio"`);

      return;
    }

    log("Setting audio to laptop...");
    await executeCommand(
      `SwitchAudioSource -t output -s "MacBook Pro Speakers"`
    );
    await executeCommand(
      `SwitchAudioSource -t input -s "MacBook Pro Microphone"`
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = { beHeadset };
