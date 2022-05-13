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
  questionsCount: {
    type: Number,
    default: 0,
  },
  //   TODO changes to ObjectId
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

const Tag = mongooseConnection.model('Tag', tagSchema);

module.exports = Tag;
