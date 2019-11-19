let orderPizza = require('./order-pizza');
let connection = require('../connection');

/**
 * 
 * @param {import('../config').Config} config 
 */
function createIntents(config) {
  let conn = connection(config.mongodbuurl);
  return {
    'Order Pizza': orderPizza(conn)
  }
};

module.exports = createIntents;