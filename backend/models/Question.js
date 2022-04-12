const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  descr: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Tag',
  }],
  answers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Answer',
  }],
  createdBy: {
    _id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
    },
    imageUrl: { type: String, maxLength: 100, required: true },
 },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  score: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  },
  reviewStatus: {
    type: String,
    required: true,
  },
  imageUrls: [
    { type: String },
  ],
});

const Question = mongooseConnection.model('Question', questionSchema);

module.exports = Question;
