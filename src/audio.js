const { executeCommand } = require("./shell");

const beHeadset = async isHeadset => {
  try {
    if (isHeadset) {
      await executeCommand(`SwitchAudioSource -t output -s "HyperX 7.1 Audio"`);
      await executeCommand(`SwitchAudioSource -t input -s "HyperX 7.1 Audio"`);

      return;
    }

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
