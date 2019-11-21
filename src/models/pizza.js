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

function price(p) {
  try {
    console.log('pizza:', p);
    console.log('size:', prices[p.size], 'base:', prices.base, 'kind:', prices[p.kind], 'extras:', prices[p.extras]);

    return prices[p.size] * (prices.base + prices[p.kind] + prices[p.extras]);
  } catch(err) {
    console.log(err);
    return 0;
  }
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