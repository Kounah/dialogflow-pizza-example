const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pizza',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

/**
 * 
 * @param {import('mongoose').Connection} connection 
 */
function model(connection) {
  return connection.model('order', schema);
}

module.exports = {
  schema,
  model
};