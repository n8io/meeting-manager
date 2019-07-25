const { config } = require("./config");

const { VERBOSE } = config;

const log = msg => VERBOSE && console.log(`${new Date().toISOString()} ${msg}`);

module.exports = { log };
