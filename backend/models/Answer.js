const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const answerSchema = new mongoose.Schema({
    _id: { type: String },
    questionId: { type: String, required: true },
    createdBy: {
        _id: { type: String, required: true },
        imageUrl: { type: String, maxLength: 100, required: true },
    },
    createdOn: { type: Date, default: Date.now },
    answer: { type: String, required: true },
    isBestAnswer: { type: Boolean, default: false }, 
});

const Answer = mongooseConnection.model('Answer', answerSchema);

module.exports = Answer;