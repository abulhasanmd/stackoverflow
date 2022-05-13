const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 1000,
	},
	descr: {
		type: String,
		required: true,
	},
	views: {
		type: Number,
		default: 0,
	},
	votes: {
		type: Number,
		default: 0,
	},
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tag',
		default: [],
	}],
	answers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Answer',
		default: [],
	}],
	createdBy: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		imageUrl: {
			type: String,
			maxLength: 500,
		},
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
	modifiedOn: {
		type: Date,
		default: Date.now(),
	},
	score: {
		type: Number,
		default: 0,
	},
	reviewStatus: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		required: true,
	},
	imageUrls: [{
		type: String,
	}],
});

const Question = mongooseConnection.model('Question', questionSchema);

module.exports = Question;