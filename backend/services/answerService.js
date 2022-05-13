const _ = require('lodash');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Event = require('../models/Event');
const User = require('../models/User');
const Comment = require('../models/Comment');
let utils = require('../utils.js');

const bestAnswerScore = 15;

async function resolveUsers(comments) {
	const userIds = _.uniq(_.map(comments, 'createdBy._id'));
	const userDetails = await User.find({
		_id: {
			$in: userIds,
		},
	}).lean();
	const usersMap = _.keyBy(userDetails, '_id');
	comments = _.map(comments, (comment) => {
		// console.log("### post : ", post)
		let userId = _.get(comment, 'createdBy._id')
		userId = userId && userId.toString();
		if(userId) {
			comment.createdBy = usersMap[userId];
		}
		return comment;
	});
	return comments;
}

const getAnswersByQuestionId = async (params) => {
	console.log('Entering answerService.getAnswersByResourceId');
	try {
		let answersResponse = await Answer.find({
			questionId: params.questionId,
		}).lean();
		let answerIds = _.map(answersResponse, '_id');
		let comments = await Comment.find({resourceId: {$in : answerIds}}).lean();
		comments = await resolveUsers(comments)
		let commentsHMap = _.groupBy(comments, 'resourceId')
		const uniqUserIds = _.uniq(_.map(answersResponse, 'createdBy._id'));
		const userInfo = await User.find({
			$in: uniqUserIds,
		}).lean();
		const usersHashMap = _.keyBy(userInfo, '_id');
		answersResponse = _.map(answersResponse, (answer) => {
			const userId = answer.createdBy._id.toString();
			answer.createdBy = usersHashMap[userId];
			answer.comments = commentsHMap[answer._id]
			return answer;
		});
		console.log(`get answer response :${answersResponse}`);
		return answersResponse;
	} catch (e) {
		console.error('Exception occurred while getting answers', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const addAnswer = async (body) => {
	console.log(`Entering answerService.addAnswer,payload is ${body}`);
	try {
		const answer = {
			...body,
		};
		const answerResponse = await Answer.create(answer);
		console.log(`add answer response :${answerResponse}`);
		await utils.log('answer', 'created', body.createdBy._id, body.questionId)
		const question = await Question.findById(body.questionId).lean();
		question.answers.push(answerResponse._id);
		const questionResponse = await Question.updateOne({
			_id: body.questionId,
		}, {
			$set: question,
		}).exec();
		if (answerResponse && questionResponse) {
			return answerResponse
		}
		return {
			error: {
				message: 'Some error occured while creating answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while creating answer', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const updateAnswer = async ({
	params,
	body,
}) => {
	console.log(`Entering answerService.updateAnswer with params: ${params} && payload:${body}`);
	try {
		body.modifiedOn = Date.now();
		const answerResponse = await Answer.updateOne({
			_id: params.answerId,
		}, {
			$set: body,
		}).exec();
		console.log(`update answer response :${answerResponse}`);
		if (answerResponse) {
			return {
				data: {
					message: 'Answer updated Successfully',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while updating answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while updating answer', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const bestAnswer = async ({
	params,
	body,
}) => {
	let { answerId, questionId, createdBy } = body
	console.log(`Entering answerService.bestAnswer with params: ${params} && payload:${body}`);
	try {
		const bestAnswerObj = await Answer.findOne({
			questionId: questionId,
			isBestAnswer: true,
		}).exec();
		if (!bestAnswerObj) {
			const answerResponse = await Answer.updateOne({
				_id: answerId,
			}, {
				$set: {
					isBestAnswer: true,
				},
			}, {
				$inc: {
					score: bestAnswerScore,
				},
			}).exec();
			console.log(`best answer response :${answerResponse}`);
			const userResponse = await User.updateOne({
				_id: createdBy,
			}, {
				$inc: {
					reputation: bestAnswerScore,
				},
			});
			if (answerResponse) {
				return {
					data: {
						message: 'Best Answer marked Successfully',
					},
				};
			}
		} else {
			const answerResponse = await Answer.updateOne({
				_id: bestAnswerObj._id,
			}, {
				$set: {
					isBestAnswer: false,
				},
			}, {
				$inc: {
					score: bestAnswerScore * -1,
				},
			}).exec();
			console.log(`removed best answer response :${answerResponse}`);
			const oldUserResponse = await User.updateOne({
				_id: bestAnswerObj.createdBy,
			}, {
				$inc: {
					reputation: bestAnswerScore * -1,
				},
			});
			const markBestAnswerResponse = await Answer.updateOne({
				_id: answerId,
			}, {
				$set: {
					isBestAnswer: true,
				},
			}, {
				$inc: {
					score: bestAnswerScore,
				},
			}).exec();
			console.log(`marked best answer response :${markBestAnswerResponse}`);
			const userResponse = await User.updateOne({
				_id: createdBy,
			}, {
				$inc: {
					reputation: bestAnswerScore,
				},
			});
			if (answerResponse && markBestAnswerResponse) {
				return {
					data: {
						message: 'Updated new Best Answer Successfully',
					},
				};
			}
			return {
				error: {
					message: 'Some error occured while marking best answer',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while marking best answer',
			},
		};
	} catch (e) {
		console.error('Exception occurred while marking best answer', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	getAnswersByQuestionId,
	addAnswer,
	updateAnswer,
	bestAnswer,
};