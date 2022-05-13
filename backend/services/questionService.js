const {
	log,
} = require('console');
const _ = require('lodash');
const Question = require('../models/Question');
const Tag = require('../models/Tag');
const Vote = require('../models/Vote');
const User = require('../models/User');
const utils = require('../utils');
const badgesService = require('./badgesService');
const Answer = require('../models/Answer');

async function getTags(tagIds) {
	const tagsInfo = await Tag.find({
		_id: {
			$in: tagIds,
		},
	}).lean();
	return tagsInfo;
}

const postQuestion = async (body) => {
	try {
		const question = await new Question(body).save();
		const user = await User.findById(body.createdBy._id);
		if (body.tags && body.tags.length > 0 && user) {
			console.log(body);
			const tagsObj = user.tagsInformation || {};
			const tagIds = [];
			body.tags.forEach((tag) => {
				if (!tagsObj[tag.name]) {
					tagsObj[tag.name] = {
						score: 0,
						posts: 0,
					};
				}
				tagIds.push(tag._id);
				tagsObj[tag.name].posts += 1;
			});
			await User.findByIdAndUpdate(body.createdBy._id, {
				tagsInformation: tagsObj,
			});
			// badgesService.updateBadges(body.createdBy._id, 'score', null, tagsObj);	
			await Tag.updateMany({ _id: { $in: tagIds } }, { $inc: { questionsCount: 1 } });
		}
		const questionCount = await Question.count({ "createdBy._id": body.createdBy._id }).lean();
		// console.log("first question count", questionCount);
		await badgesService.updateBadges(body.createdBy._id, 'numberOfQuestions', questionCount, null);

		return {
			data: question,
		};
	} catch (e) {
		console.error('Exception occurred while creating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

function addSortFunc(que, filter) {
	switch (filter) {
	case 'Interesting':
		que.sort({
			modifiedOn: -1,
		});
		break;
	case 'Hot':
		que.sort({
			views: -1,
		});
		break;
	case 'Score':
		que.sort({
			score: -1,
		});
		break;
	case 'Unanswered':
		// TO-DO
		que.sort({
			modifiedOn: -1,
		});
		break;
	default:
		break;
	}
}

const getAllQuestions = async (data) => {
	const {
		body,
		query,
		params,
	} = data;
	const {
		filter,
	} = body;
	try {
		let que = Question.find({
			reviewStatus: 'approved',
		}).lean();
		await addSortFunc(que, filter);
		const tagIds = _.uniq(_.map(que, 'tags').flat(1));
		const tags = await getTags(tagIds);
		const tagsMap = _.keyBy(tags, '_id');
		que = _.map(que, (question) => {
			question.tags = _.map(question.tags, (tag) => tagsMap[tag._id]);
			return question;
		});
		
		return {
			data: que,
		};
	} catch (e) {
		console.error('Exception occurred while creating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const updateQuestion = async (data) => {
	const { userId, questionId } = data;
	console.log(`Entering questionService.updateQuestion with params: && payload:${data}`);
	try {
		const questionResponse = await Question.updateOne({
			_id: questionId,
		}, {
			$set: data,
		}).exec();
		console.log(`update question response :${questionResponse}`);
		if (questionResponse) {
			await utils.log('question', 'edited', userId, questionId);
			return {
				data: {
					message: 'Question updated Successfully',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while updating question',
			},
		};
	} catch (e) {
		console.error('Exception occurred while updating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getUserVote = async (questionId, userId) => {
	const userVote = await Vote.findOne({
		resourceId: questionId,
		createdBy: userId,
	}).lean();
	const result = _.get(userVote, 'votes');
	return result ? `${result}` : '0';
};

const getQuestionById = async (msg) => {
	const {
		body,
		query,
		params,
	} = msg;
	const authUserId = _.get(query, 'userId');
	const {
		questionId,
	} = params;
	console.log(`Entering questionService get Question By ID with params: ${params} && payload:${body}`);
	try {
		const queDetails = await Question.findOneAndUpdate({
			_id: questionId,
		}, {
			$inc: {
				views: 1,
			},
		}, {
			returnNewDocument: true,
		}).lean();
		const tags = await getTags(queDetails.tags);
		const tagsMap = _.keyBy(tags, '_id');
		/**  resolve tags in question * */
		queDetails.tags = _.map(queDetails.tags, (tag) => tagsMap[tag._id]);
		// end
		/** resolving userInfo in questions * */
		const userId = queDetails.createdBy._id.toString();
		const userDetails = await User.findById(userId).lean();
		Object.assign(queDetails.createdBy, userDetails);
		// end
		queDetails.voted = await getUserVote(questionId, authUserId);
		return queDetails;
	} catch (e) {
		console.error('Exception occurred while while getting question by ID', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const addBookmark = async (body) => {
	const { userId } = body;
	const {
		questionId,
	} = body;
	try {
		const userResponse = await User.updateOne({
				_id: userId,
			},
			{
				$addToSet: {
					bookmarks: questionId,
				},
			},
			).exec();
		console.log(userResponse);
		if (userResponse) {
			return {
				data: {
					message: 'Bookmark created Successfully',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while creating Bookmark',
			},
		};
	} catch (e) {
		console.error('Exception occurred while creating Bookmark', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getQuestionsUserAnswered = async (data) => {
	const { userId } = data;
	const answers = await Answer.find({ createdBy: userId }, { questionId: 1 }).sort({ votes: -1 }).limit(10).lean();
	const questionIds = _.uniq(_.map(answers, 'questionId'));
	const questions = await utils.getQuestionsById(questionIds);
	return questions;
};

module.exports = {
	postQuestion,
	updateQuestion,
	getAllQuestions,
	addBookmark,
	getQuestionById,
	getQuestionsUserAnswered,
};