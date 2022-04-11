const Tag = require('../models/Tag');
const Question = require('../models/Question');
const User = require('../models/User');
const Event = require('../models/Event');

const questionConstants = require('../constants/questionConstants');

const getAllUsers = async (query) => {
	try {
		let users;
		if (query.search) {
            users = await User.find({name: { "$regex": query.search, "$options": "i" } }).limit(5).sort( { reputation: -1 }).exec();
        } else {
			users = await User.find().sort( { reputation: -1 }).exec();
        }
		return {
			data: users,
		};
	} catch (e) {
		console.error('Exception occured while getting users', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getTagsUsedInQuestions = async (userId) => {
	try {
		const tags = await User.findById({
			userId,
		}).select({
			associatedTags: 1,
		}).exec();
		return {
			data: Object.values(tags),
		};
	} catch (e) {
		console.error('Exception occurred while getting tags', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getBookmarks = async (userId) => {
	try {
		const bookmarks = await User.findById({
			userId,
		}).select({
			bookmarks: 1,
		}).exec();
		return {
			data: bookmarks,
		};
	} catch (e) {
		console.error('Exception occured while fetching bookmarks', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getReputationActivity = async (userId) => {
	try {
		const events = await Event.find({
			affectedUser: userId,
		}).exec();
		return {
			data: events,
		};
	} catch (e) {
		console.error('Error while fetching reputation activity', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	getTagsUsedInQuestions,
	getBookmarks,
	getReputationActivity,
	getAllUsers,
};