const mongoose = require('mongoose');
const {
	Schema,
} = require('./mongooseConnection');

// const tagsInformationSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 	},
// 	descr: {
// 		type: String,
// 	},
// 	score: {
// 		type: Number,
// 		default: 0,
// 	},
// 	posts: {
// 		type: Number,
// 		default: 0,
// 	},
// });

// const badgeSchema = new mongoose.Schema({
// 	type: {
// 		type: String,
// 		default: 0,
// 	},
// 	name: {
// 		type: String,
// 		maxLength: 20,
// 	},
// 	level: {
// 		type: String,
// 		maxLength: 10,
// 	},
// });

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		maxLength: 50,
	},
	emailId: {
		type: String,
		maxLength: 50,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
	},
	password: {
		type: String,
		minLength: 8,
	},
	imageUrl: {
		type: String,
		maxLength: 100,
	},
	location: {
		type: String,
		maxLength: 20,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	modifiedOn: {
		type: Date,
		default: Date.now,
	},
	reputation: {
		type: Number,
		default: 0,
	},
	tagsInformation: {
		type: Schema.Types.Mixed,
	},
	questionsAsked: {
		type: Number,
		default: 0,
	},
	answersGiven: {
		type: Number,
		default: 0,
	},
	upvotesGiven: {
		type: Number,
		default: 0,
	},
	downvotesGiven: {
		type: Number,
		default: 0,
	},
	commentsGiven: {
		type: Number,
		default: 0,
	},
	lastSeen: {
		type: Date,
		default: Date.now,
	},
	reach: {
		type: Number,
		default: 0,
	},
	about: {
		type: String,
		maxLength: 20,
	},
	badges: {
		type: Schema.Types.Mixed,
	},
	bookmarks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		default: [],
	}],
	isAdmin: {
		type: Boolean,
		default: false,
	},
}, {
	minimize: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;