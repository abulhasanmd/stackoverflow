const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const answerSchema = new mongoose.Schema({
    questionId: { type: String, required: true },
    createdBy: {
        _id: { type: String, required: true },
        imageUrl: { type: String, maxLength: 100, required: true },
    },
    createdOn: { type: Date, default: Date.now },
    answer: { type: String, required: true },
    score: { type: Number, default: 0 },
    vote: { type: Number, default: 0 },
    isBestAnswer: { type: Boolean, default: false }, 
});

const Answer = mongooseConnection.model('Answer', answerSchema);

module.exports = Answer;