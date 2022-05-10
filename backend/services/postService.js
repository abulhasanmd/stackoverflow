/* eslint-disable eqeqeq */
/* eslint-disable no-case-declarations */
const _ = require('lodash');
const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
const CommentsModel = require('../models/Comment');

function parseTagNames(searchq = '') {
	const tagRegex = /\[([^\][]*)]/g;
	const tagNames = [];
	let
		m;
	// eslint-disable-next-line no-cond-assign
	while (m = tagRegex.exec(searchq)) {
		tagNames.push(m[1]);
	}
	return tagNames;
}

async function getQueryMatchCond(searchq = '', inputTagIds = []) {
	const self = this;
	if (!searchq) {
		return {};
	}
	const parseArr = searchq.split(':');
	const key = parseArr[0];
	const
		value = parseArr[1];
	const tagNames = parseTagNames(searchq);
	self.searchTitle = '';
	self.searchDescription = '';
	if (tagNames.length) {
		self.searchTitle = `Results for Query ${searchq} tagged with ${tagNames[0]}`;
		const tagRecords = await TagsModel.find({
			name: {
				$regex: tagNames[0],
				$options: 'i',
			},
		}, {
			_id: 1,
			name: 1,
			descr: 1,
		}).lean();
		let tagIds = _.map(tagRecords, '_id');
		_.map(tagRecords, (tag) => {
			self.searchDescription += `${tag.descr}\n`;
		});
		tagIds = _.uniq(tagIds.concat(inputTagIds));
		return {
			tags: {
				$in: tagIds,
			},
		};
	}
	switch (key) {
	case 'user':
		const usersRecords = await UserModel.find({
			name: {
				$regex: value,
				$options: 'i',
			},
		}, {
			_id: 1,
		}).lean();
		const userIds = _.map(usersRecords, '_id');
		return {
			createdBy: {
				$in: userIds,
			},
		};
	case 'isaccepted':
		return {
			reviewStatus: 'approved',
		};
	case 'is':
		return {};
	default:
		console.log('##### key', key);
		return {
			title: {
				$regex: key,
				$options: 'i',
			},
		};
	}
}

function getQueryModel(searchq = '') {
	const parseArr = searchq.split(':');
	const key = parseArr[0];
	const
		value = parseArr[1];
	if (key === 'is') {
		if (value === 'answer') {
			return AnswerModel;
		}
	}
	return QuestionsModel;
}
async function getTags(tagIds) {
	const tagsInfo = await TagsModel.find({
		_id: {
			$in: tagIds,
		},
	}).lean();
	return tagsInfo;
}

async function resolveTags(posts) {
	const tagIds = _.uniq(_.map(posts, 'tags').flat(1));
	const tags = await getTags(tagIds);
	const tagsMap = _.keyBy(tags, '_id');
	posts = _.map(posts, (question) => {
		question.tags = _.map(question.tags, (tag) => tagsMap[tag._id]);
		return question;
	});
	return posts;
}

async function resolveUsers(posts) {
	const userIds = _.uniq(_.map(posts, 'createdBy._id'));
	const userDetails = await UserModel.find({
		_id: {
			$in: userIds,
		},
	}).lean();
	const usersMap = _.keyBy(userDetails, '_id');
	posts = _.map(posts, (post) => {
		post.createdBy = usersMap[post.createdBy._id];
		return post;
	});
	return posts;
}

async function resolveCommentsCount(posts) {
	const questionIds = _.uniq(_.map(posts, '_id'));
	const commentsCounts = await CommentsModel.aggregate([{
		$match: {
			resourceId: {
				$in: questionIds,
			},
		},
	}, {
		$group: {
			_id: '$resourceId',
			count: {
				$sum: 1,
			},
		},
	}]);
	const commentsCountHmap = _.keyBy(commentsCounts, (result) => result._id);
	console.log("commentsCounts : ", commentsCounts, commentsCountHmap)
	posts = _.map(posts, (post) => {
		post.commentsCount = _.get(commentsCountHmap[post._id], 'count') || 0;
		return post;
	});
	return posts;
}


async function resolveAnswersCount(posts) {
	const questionIds = _.uniq(_.map(posts, '_id'));
	const answersCounts = await AnswerModel.aggregate([{
		$match: {
			questionId: {
				$in: questionIds,
			},
		},
	}, {
		$group: {
			_id: '$questionId',
			count: {
				$sum: 1,
			},
		},
	}]);
	const answersCountsHmap = _.keyBy(answersCounts, (result) => result._id);
	console.log("answersCounts : ", answersCounts, answersCountsHmap)
	posts = _.map(posts, (post) => {
		post.answersCount = _.get(answersCountsHmap[post._id], 'count') || 0;
		return post;
	});
	return posts;
}

async function getAllPosts(data) {
	const self = this;
	const {
		body,
		query,
		params,
	} = data;
	const {
		searchq,
		filter,
		tagIds,
	} = body;
	if (false) { // By-Passing redis, considering dynamic search
		const redisData = await global.redisClient.get('allposts');
		if (redisData != 'null' && redisData) return JSON.parse(redisData);
	}
	let dbquery = getQueryModel(searchq);
	const searchqMatchCond = await getQueryMatchCond.call(self, searchq, tagIds);
	if (!searchqMatchCond.tags && tagIds) {
		searchqMatchCond.tags = {
			$in: tagIds,
		};
	}
	dbquery = dbquery.find(searchqMatchCond);
	switch (filter) {
	case 'votes':
		dbquery.sort({
			votes: -1,
		});
		break;
	case 'newest':
		dbquery.sort({
			createdOn: -1,
		});
		break;
	case 'Interesting':
		dbquery.sort({
			modifiedOn: -1,
		});
		break;
	case 'Hot':
		dbquery.sort({
			views: -1,
		});
		break;
	case 'Score':
		dbquery.sort({
			score: -1,
		});
		break;
	case 'Unanswered':
		// TO-DO
		dbquery.sort({
			modifiedOn: -1,
		});
		break;
	default:
		dbquery.sort({
			votes: 1,
		});
		break;
	}
	let posts = await dbquery.lean();
	posts = await resolveTags(posts);
	posts = await resolveUsers(posts);
	posts =  await resolveCommentsCount(posts)
	posts = await resolveAnswersCount(posts)
	return {
		posts,
		total: posts.length,
		searchTitle: self.searchTitle,
		searchDescription: self.searchDescription,
	};
}

module.exports = {
	getAllPosts,
};