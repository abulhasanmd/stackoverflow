const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const voteSchema = new mongoose.Schema({
    createdBy: {type: String, required: true},
    createdOn: { type: Date, default: Date.now },
    resourceType: {type: String, enum: ["ques", "ans"], required: true},
    resourceId: {type: String, required: true},
    score: {type: String, enum: [10, -10, 5, -5], required: true},
    votes: {type: String, enum: [1, -1], required: true},
});

const Vote = mongooseConnection.model('Vote', voteSchema);

module.exports = Vote;