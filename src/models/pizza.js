const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  size: {
    type: 'string',
    enum: ['Groß', 'Mittel', 'Klein', 'Family', 'Party'],
    required: true,
    default: 'medium'
  },
  kind: {
    type: 'string',
    enum: ['Salami', 'Hawaii', 'Schinken', 'Margherita', 'Käse'],
    required: true,
    default: 'salami'
  },
  extras: {
    type: 'string',
    required: false,
    default: 'Keine Extras'
  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
})

const prices = require('../prices');

function price(pizza) {
  return prices[pizza.size] * (prices.base + prices[pizza.kind] + prices[pizza.extras]);
}

/**
 * 
 * @param {import('mongoose').Connection} connection 
 */
function model(connection) {
  return connection.model('Pizza', schema);
}

module.exports = {
  schema,
  model,
  price
};