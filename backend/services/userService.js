/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
const _ = require('lodash');
const mongoose = require('mongoose');
const Tag = require('../models/Tag');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Event = require('../models/Event');
const utils = require('../utils');

const questionConstants = require('../constants/questionConstants');

const getAllUsers = async (query) => {
	try {
		let users;
		if (query.search) {
			users = await User.find({
				name: {
					$regex: query.search,
					$options: 'i',
				},
			}).limit(5).sort({
				reputation: -1,
			}).exec();
		} else {
			users = await User.find().sort({
				reputation: -1,
			}).exec();
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

const getEvents = async (userId) => {
	try {
		const events = await Event.aggregate().match({
			affectedUser: new mongoose.Types.ObjectId(userId),
		}).group({
			_id: {
				$dateToString: {
					format: '%Y-%m-%d',
					date: '$createdOn',
				},
			},
			events: {
				$push: '$$ROOT',
			},
		});
		return events;
	} catch (error) {
		return {
			error: {
				message: error.message,
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
	let questions = await Question.find({
		'createdBy._id': userId,
	}, {
		tags: 1,
		votes: 1,
	}).lean();
	// console.log("tagsUsedByUser: ##### questions:", questions);
	const tagIds = _.uniq(_.concat(..._.map(questions, 'tags')));
	let tags = await Tag.find({
		_id: {
			$in: tagIds,
		},
	}).lean();
	// console.log("tagsUsedByUser: ##### tags:", tags);
	questions = _.map(questions, (ques) => {
		ques.tags = _.map(ques.tags, (tagId) => tagId.toString());
		return ques;
	});
	const tagsScore = {};
	const tagPostsCount = {};
	_.forEach(tagIds, (tagId) => {
		tagId = tagId.toString();
		tagsScore[tagId] = _.sumBy(questions, (question) => _.includes(question.tags, tagId) && question.votes || 0);
		tagPostsCount[tagId] = _.sumBy(questions, (question) => (_.includes(question.tags, tagId.toString()) ? 0 : 1));
	});
	// console.log("$$$$ tagPostsCount : ", tagPostsCount)
	tags = _.map(tags, (tag) => {
		tag.score = tagsScore[tag._id] || 0;
		tag.questionsCount = tagPostsCount[tag._id];
		return tag;
	});
	_.sortBy(tags, (tag) => -tag.score); // sorted in descending order
	return _.cloneDeep(tags);
}

const getUserProfile = async (userId) => {
	// console.log("######## IN getUserProfile #######")
	try {
		const userDetails = await User.findOne({
			_id: userId,
		}).populate({
			path: 'bookmarks.tags',
		}).lean();
		const questionsAsked = await Question.count({
			'createdBy._id': userId,
		}).lean();
		let topUserQuestions = await Question.find({
			'createdBy._id': userId,
		}).sort({
			votes: -1,
		}).limit(10).lean();
		topUserQuestions = await utils.resolveTags(topUserQuestions);
		const questionsUserAnswered = await utils.getQuestionsUserAnswered(userId);
		const questionsAnswered = await Answer.count({
			'createdBy._id': userId,
		}).lean();
		const tagsUsed = await tagsUsedByUser(userId);
		userDetails.tagsUsed = _.cloneDeep(tagsUsed) || [];
		Object.assign(userDetails, {
			questionsAnswered,
			questionsAsked,
			topUserQuestions,
			questionsUserAnswered,
		});
		return userDetails;
	} catch (e) {
		console.error('Error while fetching getUserProfile', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

async function getPosts(userId, body) {
	let getPostsP;
	body.filter = body.filter || 'ALL';
	body.sortBy = body.sortBy || 'SCORE';
	switch (body.filter) {
	case 'ALL':
		getPostsP = [Question.find({
			createdBy: userId,
		}).limit(10), Answer.find({
			createdBy: userId,
		}).limit(10)];
		break;
	case 'QUESTIONS':
		getPostsP = [Question.find({
			createdBy: userId,
		}).limit(10)];
		break;
	case 'ANSWERS':
		getPostsP = [Answer.find({
			createdBy: userId,
		}).limit(10)];
		break;
	default:
		break;
	}
	switch (body.sortBy) {
	case 'SCORE':
		getPostsP = _.map(getPostsP, (getpost) => getpost.sort({
			score: 1,
		}));
		break;
	case 'NEWEST':
		getPostsP = _.map(getPostsP, (getpost) => getpost.sort({
			createdOn: 1,
		}));
		break;
	default:
		break;
	}
	let posts = [];
	_.forEach(getPostsP, async (postsP) => posts.push(...await postsP));
	posts = _.slice(_.sortBy(posts, (post) => post.score), 0, 10);
	return posts;
}

const getUserPosts = async (data) => {
	const {
		body,
		params,
		query,
	} = data;
	const {
		userId,
	} = params;
	try {
		const response = await getPosts(userId, body);
		return {
			data: {
				posts: response,
			},
		};
	} catch (e) {
		console.error('Error while fetching getUserPosts', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const updateUserProfile = async (data) => {
	const {
		body,
		params,
		query,
	} = data;
	try {
		const {
			imageUrl,
		} = body;
		const {
			about,
		} = body;
		const {
			location,
		} = body;
		const {
			userId,
		} = body;
		const userDetails = await User.updateOne({
			_id: userId,
		}, {
			$set: {
				imageUrl,
				about,
				location,
			},
		}).exec();

		if (userDetails) {
			return {
				data: {
					message: 'UserProfile updated Successfully',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while updating User Profile',
			},
		};
	} catch (e) {
		console.error('Error while fetching getUserPosts', e);
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
	getUserProfile,
	getUserPosts,
	updateUserProfile,
	getEvents,
};