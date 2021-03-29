const mongoose = require('mongoose');
const shortId = require('shortid');

/* Creating the schema of the table where the urls get inserted */
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  }
});

/* Modules are exported to be used in server.js */
module.exports = mongoose.model('ShortUrl', shortUrlSchema);