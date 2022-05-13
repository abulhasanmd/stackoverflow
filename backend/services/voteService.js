const Vote = require('../models/Vote');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Event = require('../models/Event');
const utils = require('../utils');

const addVote = async (body) => {
	console.log(`Entering voteService.addVote,payload is ${JSON.stringify(body)}`);
	try {
		const vote = {
			...body,
		};
		const voteRecord = await Vote.find({
			$and: [{
				resourceId: body.resourceId,
			}, {
				createdBy: body.createdBy,
			}],
		});
		let affectedUser;
		let
			articleName;
		console.log('vote record is ', voteRecord);
		if (!voteRecord.length) {
			const voteResponse = await Vote.create(vote);
			console.log(`add vote response :${voteResponse}`);
			await utils.log('vote', 'added', body.createdBy, body.resourceId);
			if (vote.resourceType === 'ques') {
				const questionResponse = await Question.updateOne({
					_id: body.resourceId,
				}, {
					$inc: {
						score: vote.score,
						votes: vote.votes,
					},
				});
				const question = await Question.findById(body.resourceId);
				affectedUser = question.createdBy._id;
				articleName = question.title;
				console.log(`update question response :${JSON.stringify(questionResponse)}`);
			} else if (vote.resourceType === 'ans') {
				const answerResponse = await Answer.updateOne({
					_id: body.resourceId,
				}, {
					$inc: {
						score: vote.score,
						votes: vote.votes,
					},
				});
				console.log(`update answer response :${answerResponse}`);
				const answer = await Answer.findById(body.resourceId).populate('questionId');
				affectedUser = answer.createdBy._id;
				articleName = answer.questionId.title;
			}
			const userResponse = await User.updateOne({
				_id: affectedUser,
			}, {
				$inc: {
					reputation: vote.score,
				},
			});
			const eventResponse = await Event.create({
				type: vote.score > 0 ? 'upvote' : 'downvote', // should handle marked-as-best in mark best api
				outcome: vote.score,
				createdBy: vote.createdBy,
				affectedUser,
				articleName,
				articleType: vote.resourceType === 'ans' ? 'answer' : 'question',
				articleId: vote.resourceId,
			});
			if (voteResponse) {
				return {
					data: {
						message: 'Vote created Successfully',
					},
				};
			}
		} else if (voteRecord.length > 0 && ((voteRecord[0].score > 0 && vote.score < 0) || (voteRecord[0].score < 0 && vote.score > 0))) {
			const voteResponse = await Vote.updateOne({
				_id: voteRecord[0]._id,
			}, {
				$set: {
					score: vote.score,
					votes: vote.votes,
				},
			});
			console.log(`update vote response :${voteResponse}`);
			if (vote.resourceType === 'ques') {
				const questionResponse = await Question.updateOne({
					_id: body.resourceId,
				}, {
					$inc: {
						score: vote.score * 2,
						votes: vote.votes * 2,
					},
				});
				console.log(`update question response :${questionResponse}`);
				const question = await Question.findById(body.resourceId);
				affectedUser = question.createdBy._id;
			} else if (vote.resourceType === 'ans') {
				const answerResponse = await Answer.updateOne({
					_id: body.resourceId,
				}, {
					$inc: {
						score: vote.score * 2,
						votes: vote.votes * 2,
					},
				});
				console.log(`update answer response :${answerResponse}`);
				const answer = await Answer.findById(body.resourceId).populate('questionId');
				affectedUser = answer.createdBy._id;
			}
			const userResponse = await User.updateOne({
				_id: affectedUser,
			}, {
				$inc: {
					reputation: vote.score * 2,
				},
			});
			const eventResponse = await Event.create({
				type: vote.score > 0 ? 'upvote' : 'downvote', // should handle marked-as-best in mark best api
				outcome: vote.score,
				createdBy: vote.createdBy,
				affectedUser,
				articleType: vote.resourceType === 'ans' ? 'answer' : 'question',
				articleId: vote.resourceId,
			});
			if (voteResponse) {
				return {
					data: {
						message: 'Vote updated Successfully',
					},
				};
			}
		} else if (voteRecord.length > 0 && ((voteRecord[0].score > 0 && vote.score > 0) || (voteRecord[0].score < 0 && vote.score < 0))) {
			return {
				error: {
					message: 'Vote already exists',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while creating vote',
			},
		};
	} catch (e) {
		console.error('Exception occurred while creating vote', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	addVote,
};