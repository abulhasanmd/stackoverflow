const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const commentSchema = new mongoose.Schema({
    createdBy: {
        _id: { type: String, required: true },
        imageUrl: { type: String, maxLength: 100, required: true },
    },
    createdOn: { type: Date, default: Date.now },
    resourceType: { type: String, enum: ["ques", "ans"] },
    resourceId: { type: String, required: true },
    comment: { type: String, maxLength: 500, required: true }
});

const Comment = mongooseConnection.model('Comment', commentSchema);

module.exports = Comment;

