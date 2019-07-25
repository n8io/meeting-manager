const shell = require("shelljs");
const { config } = require("./config");
const { log } = require("./log");

const { VERBOSE } = config;

const executeCommand = command =>
  new Promise((resolve, reject) => {
    log(`Executing command '${command}'`);
    shell.exec(command, { silent: !VERBOSE }, (code, _stdOut, stdErr) => {
      if (stdErr || code) return reject({ code, stdErr });

      return resolve();
    });
  });

module.exports = { executeCommand };
