const orderPizza = require('./order-pizza');
const completeOrder = require('./complete-order');
const completeOrderFinish = require('./complete-order-finish');
const connection = require('../connection');

function wrapHandler(name, fn) {
  if(typeof fn !== 'function')
    throw new TypeError('fn is not a function');

  return function(...args) {
    console.log('executing handler', name);
    return fn(...args);
  }
}

/**
 * 
 * @param {import('../config').Config} config 
 */
function createIntents(config) {
  let conn = connection(config.mongodburl);
  return {
    'Order Pizza': wrapHandler('Order Pizza', orderPizza(conn)),
    'Complete Order': wrapHandler('Complete Order', completeOrder(conn)),
    'Complete Order - Finish': wrapHandler('Complete Order - Finish', completeOrderFinish(conn)),
  }
};

module.exports = createIntents;