const mongoose = require('mongoose');
const mongooseConnection = require('./mongooseConnection');

const logsSchema = new mongoose.Schema({
	what: {
		type: String,
		required: true
	},
	comment: {
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
		default: Date.now(),
	},
	resourceId: {
		type: String,
	},
});

const logs = mongooseConnection.model('logs', logsSchema);

module.exports = logs;