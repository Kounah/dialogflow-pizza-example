const mongoose = require('mongoose');

function connection(url) {
  return mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = connection;