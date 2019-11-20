const orderPizza = require('./order-pizza');
const completeOrder = require('./complete-order');
const completeOrderFinish = require('./complete-order-finish');
const connection = require('../connection');

/**
 * 
 * @param {import('../config').Config} config 
 */
function createIntents(config) {
  let conn = connection(config.mongodburl);
  return {
    'Order Pizza': orderPizza(conn),
    'Complete Order': completeOrder(conn),
    'Complete Order - Finish': completeOrderFinish(conn),
  }
};

module.exports = createIntents;