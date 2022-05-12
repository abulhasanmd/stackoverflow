const {
	log,
} = require('console');
const _ = require('lodash');
const Question = require('../models/Question');
const Tag = require('../models/Tag');
const User = require('../models/User');

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

const updateQuestion = async ({
	params,
	body,
}) => {
	console.log(`Entering questionService.updateQuestion with params: ${params} && payload:${body}`);
	try {
		const questionResponse = await Question.updateOne({
			_id: params.questionId,
		}, {
			$set: body,
		}).exec();
		console.log(`update question response :${questionResponse}`);
		if (questionResponse) {
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

const getQuestionById = async (msg) => {
	const {
		body,
		query,
		params,
	} = msg;
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
	const userId = body.createdBy;
	const {
		questionId,
	} = body;
	try {
		const userResponse = await User.updateOne({
				_id: userId,
			},
			[{
				$set: {
					bookmarks: {
						$cond: [{
								$in: [`${questionId}`, '$bookmarks'],
							},
							{
								$setDifference: ['$bookmarks', [`${questionId}`]],
							},
							{
								$concatArrays: ['$bookmarks', [`${questionId}`]],
							},
						],
					},
				},
			}]).exec();
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

module.exports = {
	postQuestion,
	updateQuestion,
	getAllQuestions,
	addBookmark,
	getQuestionById,
};