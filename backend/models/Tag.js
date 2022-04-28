const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
  },
  //   TODO changes to ObjectId
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const Tag = mongooseConnection.model('Tag', tagSchema);

module.exports = Tag;
