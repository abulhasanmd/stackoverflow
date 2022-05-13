const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const answerSchema = new mongoose.Schema({
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
	createdBy: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		imageUrl: {
			type: String,
			maxLength: 100,
			required: true,
		},
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	answer: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		default: 0,
	},
	votes: {
		type: Number,
		default: 0,
	},
	isBestAnswer: {
		type: Boolean,
		default: false,
	},
});

const Answer = mongooseConnection.model('Answer', answerSchema);

module.exports = Answer;