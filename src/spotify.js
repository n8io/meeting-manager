const { executeCommand } = require("./shell");

const PAUSE = "pause";
const PLAY = "play";

const bePaused = async isPaused => {
  try {
    await executeCommand(`spotify ${isPaused ? PAUSE : PLAY}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { bePaused };
