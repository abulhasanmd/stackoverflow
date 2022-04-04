const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const voteSchema = new mongoose.Schema({
    createdBy: {type: String, required: true},
    createdOn: { type: Date, default: Date.now },
    resourceType: {type: String, enum: ["ques", "ans"]},
    resourceId: {type: String, required: true},
    score: {type: String, enum: [10, -10, 5, -5], required: true}
});

const Vote = mongooseConnection.model('Vote', voteSchema);

module.exports = Vote;