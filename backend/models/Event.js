const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const eventSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		maxlength: 20,
	},
	outcome: {
		type: String,
		maxLength: 20,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	affectedUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	articleType: {
		type: String,
	},
	articleId: {
		type: String,
	},
	articleName: {
		type: String,
	},
});

const Event = mongooseConnection.model('Event', eventSchema);

module.exports = Event;