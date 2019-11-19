const Config = require('./src/config');

/**
 * 
 * @param {import('./src/config').Config} config 
 */
function intents(config) {
  let config = new Config(config);
  let intents = require('./src/intents')(config);
  return intents;
}

module.exports = intents;