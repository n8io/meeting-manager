const { executeCommand } = require("./shell");

const PAUSE = "pause";
const PLAY = "play";

const bePlaying = async isPlaying => {
  try {
    await executeCommand(`spotify ${isPlaying ? PLAY : PAUSE}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { bePlaying };
