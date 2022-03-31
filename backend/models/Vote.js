const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const voteSchema = new mongoose.Schema({
    _id: { type: string, required: true},
    createdBy: {type: String, required: true},
    createdOn: { type: Date, default: Date.now },
    resourceType: {type: string, enum: ["ques", "ans"]},
    resourceId: {type: String, required: true},
    vote: {type: String, enum: [1, -1], required: true}
});

const Vote = mongooseConnection.model('Vote', voteSchema);

module.exports = Vote;