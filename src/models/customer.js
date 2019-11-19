let mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    middle: {
      type: [String],
      required: false
    },
    last: {
      type: String,
      required: true
    }
  },
  address: {
    street: {
      type: String,
      required: true
    },
    housenumber: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: false
  },
  telephone: {
    type: String,
    required: false
  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
})

/**
 * 
 * @param {import('mongoose').Connection} connection 
 */
function model(connection) {
  return connection.model('Customer', schema);
}

module.exports = {
  schema,
  model
};