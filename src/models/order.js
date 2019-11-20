const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  pizzas: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'pizza',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: false
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