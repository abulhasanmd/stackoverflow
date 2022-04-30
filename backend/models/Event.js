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
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
	affectedUser: {
		type: Number,
	},
	articleType: {
		type: String,
	},
	articleId: {
		type: String,
	},
});

const Event = mongooseConnection.model('Event', eventSchema);

module.exports = Event;