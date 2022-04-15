const Tag = require('../models/Tag');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Event = require('../models/Event');
var _ = require('lodash')

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

async function tagsUsedByUser(userId) {
	let questions = await Question.find({createdBy: userId}, {tags: 1, votes: 1}).exec();
	let tagIds = _.uniq(_.concat(..._.map(a, 'tags')))
	let tags = Tag.find({_id: {$in: tagIds}}).exec()
	let tagsScore = {}
	_.forEach(tagIds, (tagId) => { tagsScore[tagId] =_.sumBy(questions, (question) => _.includes(question.tags, tagId) && question.votes || 0) })
	tags = _.map(tags, (tag) => {
		tag.score = tagsScore[tag._id]
		return tag
	})
	_.sortBy(tags, (tag) => -tag.score); // sorted in descending order
	return tags;
}

const getUserProfile = async (userId) => {
	try {
		let userDetails = await User.findOne({_id: userId}).exec();
		let questionsAsked = await Question.count({createdBy: userId}).exec();
		let questionsAnswered = await Answer.count({'createdBy._id': userId}).exec();
		let tagsUsed = await tagsUsedByUser(userId)
		let response = {...userDetails, questionsAnswered, questionsAsked, tags: tagsUsed}
		return {data: response}
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
	getUserProfile
};