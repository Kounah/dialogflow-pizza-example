let orderPizza = require('./order-pizza');
let connection = require('../connection');

/**
 * 
 * @param {import('../config').Config} config 
 */
function createIntents(config) {
  let conn = connection(config.mongodburl);
  return {
    'Order Pizza': orderPizza(conn)
  }
};

module.exports = createIntents;