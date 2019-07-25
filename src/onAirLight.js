const https = require("https");
const { config } = require("./config");
const { log } = require("./log");

const { IFTTT_MAKER_KEY } = config;

const beOn = isOn => {
  const makerEvent = isOn ? "ON_AIR" : "OFF_AIR";
  const url = `https://maker.ifttt.com/trigger/${makerEvent}/with/key/${IFTTT_MAKER_KEY}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let body = "";
        log(
          JSON.stringify({
            code: res.statusCode,
            message: res.statusMessage,
          })
        );

        res.on("data", chunk => (body += chunk));
        res.on("end", () => {
          log(`${makerEvent} event has been sent to IFTTT Maker channel`);
          return resolve(!isOn);
        });
      })
      .on("error", e => {
        log("Failed to trigger Maker channel", e);
        return reject(e);
      });
  });
};

module.exports = { beOn };
