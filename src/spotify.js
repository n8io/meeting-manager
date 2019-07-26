const { executeCommand, which } = require("./shell");

const SPOTIFY_COMMAND = "spotify";
const PAUSE = "pause";
const PLAY = "play";

const bePaused = async isPaused => {
  const hasSpotify = await which(SPOTIFY_COMMAND);

  if (!hasSpotify) {
    console.error(
      `Missing ${SPOTIFY_COMMAND} (npm install -g spotify-cli-mac) that is used to toggle Spotify playback`
    );

    return;
  }
  try {
    await executeCommand(`${SPOTIFY_COMMAND} ${isPaused ? PAUSE : PLAY}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { bePaused };
