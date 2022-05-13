const Tag = require('../models/Tag');
const Question = require('../models/Question');
const User = require('../models/User');
const questionConstants = require('../constants/questionConstants');

const getTags = async () => {
	console.log('Entering adminService.getTags');
	try {
		const tags = await Tag.find().exec();
		return {
			data: tags,
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

const addTag = async (tagRequest) => {
	console.log(`Entering adminService.addTag,params are ${tagRequest}`);
	try {
		const tag = new Tag({
			name: tagRequest.name,
			descr: tagRequest.descr,
			createdBy: tagRequest.admin,
		});
		const tagResponse = await tag.save();
		console.log(`tagrespoinse :${tagResponse}`);
		if (tagResponse) {
			return {
				data: {
					message: `Tag ${tagRequest.name} created Successfully`,
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while creating Tag',
			},
		};
	} catch (e) {
		console.error('Exception occurred while getting tags', e);
		if (e && e.message.includes('name_1')) {
			return {
				error: {
					message: `Tag ${tagRequest.name} already exist`,
				},
			};
		}
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getPendingQuestions = async () => {
	console.log('Entering adminService.getPendingQuestions');
	try {
		const questions = await Question.find({
			reviewStatus: questionConstants.PENDING_STATUS,
		}).exec();
		return {
			data: questions,
		};
	} catch (e) {
		console.error('Exception occurred while getting pendingQuestions', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const updateReviewStatus = async (updateParams) => {
	console.log(`Entering adminService.updateReviewStatus with params:${JSON.stringify(updateParams)}`);
	try {
		const questions = await Question.updateOne({
			_id: updateParams._id,
		}, {
			reviewStatus: updateParams.reviewStatus,
		}).exec();
		console.log(JSON.stringify(questions));
		if (questions.modifiedCount < 1) {
			return {
				error: {
					message: 'No Question found to be updated or status unchanged',
				},
			};
		}
		return {
			data: {
				message: `Status successfully updated to ${updateParams.reviewStatus} for the question`,
			},
		};
	} catch (e) {
		console.error('Exception occurred while updating review status', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getAnalytics = async () => {
	console.log('Entering adminService.getAnalytics');
	try {
		const topTags = await Tag.find({}, {
				_id: 0,
				name: 1,
				questionsCount: 1,
			})
			.sort({
				questionsCount: -1,
			}).limit(10).exec();
		const topQuestions = await Question.find({}, {
			views: 1,
			title: 1,
			_id: 0,
		}).sort({
			views: -1,
		}).limit(10).exec();
		const questionsPerDay = await Question.aggregate([{
				$group: {
					_id: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$createdOn',
						},
					},
					count: {
						$sum: 1,
					},

				},
			},
			{
				$sort: {
					_id: 1,
				},
			},
		]);
		// const questionsPerDay = {};
		// questionsGrouped.forEach((elem) => {
		//   questionsPerDay[elem._id] = elem.count;
		// });
		const topUsers = await User.find({}, {
				name: 1,
				_id: 0,
				reputation: 1,
			})
			.sort({
				reputation: -1,
			}).limit(10).exec();
		const bottomUsers = await User.find({}, {
				name: 1,
				_id: 0,
				reputation: 1,
			})
			.sort({
				reputation: 1,
			}).limit(10).exec();

		return {
			data: {
				topTags,
				topQuestions,
				topUsers,
				bottomUsers,
				questionsPerDay,
			},
		};
	} catch (e) {
		console.error('Exception occurred while getting analytics', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};
module.exports = {
	getTags,
	addTag,
	getPendingQuestions,
	updateReviewStatus,
	getAnalytics,
};