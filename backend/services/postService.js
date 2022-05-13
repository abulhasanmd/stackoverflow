/* eslint-disable eqeqeq */
/* eslint-disable no-case-declarations */
const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
const CommentsModel = require('../models/Comment');
var _ = require('lodash')

function parseTagNames(searchq = '') {
	const tagRegex = /\[([^\][]*)]/g;
	const tagNames = [];
	let m;
	// eslint-disable-next-line no-cond-assign
	while (m = tagRegex.exec(searchq)) {
		tagNames.push(m[1]);
	}
	return tagNames;
}

let addSortFilter = (dbquery, filter) => {
	switch (filter) {
		case 'votes':		dbquery.sort({ votes: -1 }); break;
		case 'newest': 		dbquery.sort({ createdOn: -1 }); break;
		case 'Interesting': dbquery.sort({ modifiedOn: -1}); break;
		case 'Hot': 		dbquery.sort({ views: -1 }); break;
		case 'Score': 		dbquery.sort({ score: -1 }); break;
		case 'Unanswered':  dbquery.sort({ modifiedOn: -1 }); break;
		default: 			dbquery.sort({ votes: -1 }); break;
		}
}

let getSearchqModelKeyValue = (searchq) => {
	searchq = searchq.trim()
	let searchItems = searchq.split(' ')
	let standardSearchItems = ['is:question', 'user:', 'isaccepted:yes', 'isaccepted:no', 'is:question', 'is:answer', 'tag']
	let model, key, value, query;
	let foundItem = _.get(_.filter(standardSearchItems, (item) => _.startsWith(searchq, item) || (item == 'tag' && _.startsWith(searchItems[0], '[') && _.endsWith(searchItems[0], ']'))), '0')
    // console.log("fountItem : ", foundItem)
	switch(foundItem) {
		case 'is:question':
            model = 'question'
			key = 'title'
			value = searchq.substring('is:question'.length).trim()
            query = ''
            break;
		case 'user:':
            model = 'user'
			searchq = searchq.substring('user:'.length).trim()
			let searchqSplit = searchq.split(' ')
			key = 'name'
			value = searchqSplit.shift()
			query = searchqSplit.join(' ')
            break;
		case 'isaccepted:yes':
            model = 'question'
			searchq = searchq.substring('isaccepted:yes'.length).trim()
			key   = 'reviewStatus'
			value = 'approved',
            query = searchq
            break;
		case 'isaccepted:no':
            model = 'question'
			searchq = searchq.substring('isaccepted:no'.length).trim()
			key   = 'reviewStatus'
			value = 'rejected'
            query = searchq
            break;
		case 'is:answer':
            model = 'answer'
			searchq = searchq.substring('is:answer'.length).trim()
			key = 'answer'
			value = searchq
            break;
		case 'tag':
			// console.log("==== tag : ")
			model = 'tag'
			key = 'name'
			value = searchq.substring(searchq.indexOf('[')+1, searchq.indexOf(']')).trim()
			query = searchq.substr(searchq.indexOf(']')+1)
			break;
		default:
            model = 'question'
			key = 'title'
			value = searchq
			query = undefined
            break;
	}
	query = query && query.trim()
	key = key.trim()
	value = value && value.trim()
	return {model, key, value, query};
}

let getUsersOnMatch = async (key, value) => {
	let matchCnd = {}
	matchCnd[key] = { $regex: `^${value}$`, $options: 'i' }
	let usersR = await UserModel.find(matchCnd).lean();
	// console.log("###getUsersOnMatch : matchCnd : ", matchCnd, usersR);
	return usersR;
}

let getTagsOnMatch = async (key, value) => {
	let matchCnd = {}
	matchCnd[key] = { $regex: `^${value}$`, $options: 'i' }
	let tagsR = await TagsModel.find(matchCnd).lean();
	return tagsR;
}

let getQuestionsMatchCnd = (key, value) => {
	let matchCnd = {}
	if (key !== 'reviewStatus') {
		matchCnd = {reviewStatus: 'approved'}
	}
	if (value) {
		matchCnd[key] = { $regex: value, $options: 'i' }
	}
	return matchCnd
}

async function getRawPosts(searchq = '', filter, inputTagIds = []) {
	const self = this;
	let {model, key, value, query} = getSearchqModelKeyValue(searchq);
	console.log("# search : ", model, key, value, query)
	let matchCnd = {}, posts = [], QuestionsP;
	self.searchDescription = ''
	switch(model) {
		case 'question':
			self.searchTitle = `Results for Query '${value}' : questions`;
			QuestionsP = QuestionsModel.find(getQuestionsMatchCnd(key, value))
			addSortFilter(QuestionsP, filter)
			posts = await QuestionsP.lean()
			break;
		case 'answer':
			self.searchTitle = `Results for Query '${value}' : answers`;
			let answersP = AnswerModel.find({answer: { $regex: value, $options: 'i'}})
			addSortFilter(answersP, filter)
			posts = await answersP.lean()
			break;
		case 'user':
			self.searchTitle = `Results for Query '${query}' questioned by '${value}'`;
			let usersInfo = await getUsersOnMatch(key, value)
			let userIds = _.map(usersInfo, '_id');
			matchCnd = {reviewStatus: 'approved', "createdBy._id": { $in: userIds }}
			if(query) {
				matchCnd['title'] = { $regex: query, $options: 'i'}
			}
			QuestionsP = QuestionsModel.find(matchCnd)
			addSortFilter(QuestionsP, filter)
			posts = await QuestionsP.lean()
			break;
		case 'tag':
			self.searchTitle = `Results for Query '${query}' tagged with '${value}'`;
			matchCnd[key] = { $regex: `^${value}$`, $options: 'i'};
			let tags = await getTagsOnMatch(key, value) 
			self.searchDescription = _.get(tags, '0.descr')
			let tagIds = _.map(tags, '_id')
			QuestionsP = QuestionsModel.find({reviewStatus: 'approved', title: { $regex: query, $options: 'i'}, tags: { $in: tagIds }})
			addSortFilter(QuestionsP, filter)
			posts = await QuestionsP.lean()
			break;
	}
	return posts;
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
		// console.log("### post : ", post)
		if(_.get(post, 'createdBy._id')) {
			post.createdBy = usersMap[post.createdBy._id];
		}
		return post;
	});
	return posts;
}

async function resolveCommentsCount(posts) {
	const resourceIds = _.uniq(_.map(posts, '_id'));
	const commentsCounts = await CommentsModel.aggregate([{
		$match: {
			resourceId: {
				$in: resourceIds,
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
	// console.log("commentsCounts : ", commentsCounts, commentsCountHmap)
	posts = _.map(posts, (post) => {
		post.commentsCount = _.get(commentsCountHmap[post._id], 'count') || 0;
		return post;
	});
	return posts;
}


async function resolveAnswersCount(posts) {
	//resourceId can be question/answer
	const resourceIds = _.uniq(_.map(posts, '_id'));
	const answersCounts = await AnswerModel.aggregate([{
		$match: {
			questionId: {
				$in: resourceIds,
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
	// console.log("answersCounts : ", answersCounts, answersCountsHmap)
	posts = _.map(posts, (post) => {
		post.answersCount = _.get(answersCountsHmap[post._id], 'count') || 0;
		return post;
	});
	return posts;
}

async function getAllPosts(data) {
	const self = this;
	const { body, query, params } = data;
	const { searchq, filter, tagIds } = body;
	let posts = await getRawPosts.call(self, searchq, filter)
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