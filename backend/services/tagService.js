const _ = require('lodash');
const TagsModel = require('../models/Tag');
const QuestionsModel = require('../models/Question');

const getTags = async (msg) => {
	let limit = 100;
	const searchWord = msg.query.search;
	let matchCond = {};
	const lastWeek = new Date();
	const lastDay = new Date();
	lastWeek.setDate(lastWeek.getDate() - 7);
	lastDay.setDate(lastWeek.getDate() - 1);
	try {
		if (searchWord) {
			limit = 5;
			matchCond = {
				name: {
					$regex: searchWord,
					$options: 'i',
				},
			};
		}
		let tags = await TagsModel.find(matchCond).limit(limit).lean();
		const tagIds = _.map(tags, '_id');
		const totalTags = await QuestionsModel.aggregate([{
			$match: {
				tags: {
					$in: tagIds,
				},
			},
		}, {
			$group: {
				_id: '$tags',
				count: {
					$sum: 1,
				},
			},
		}]);
		const currentWeekTags = await QuestionsModel.aggregate([{
			$match: {
				tags: {
					$in: tagIds,
				},
				createdOn: {
					$gte: lastWeek,
				},
			},
		}, {
			$group: {
				_id: '$tags',
				count: {
					$sum: 1,
				},
			},
		}]);
		const currentDayTags = await QuestionsModel.aggregate([{
			$match: {
				tags: {
					$in: tagIds,
				},
				createdOn: {
					$gte: lastDay,
				},
			},
		}, {
			$group: {
				_id: '$tags',
				count: {
					$sum: 1,
				},
			},
		}]);

		const totalTagsUsage = _.keyBy(totalTags, (result) => result._id[0]);
		const currentWeekTagsUsage = _.keyBy(currentWeekTags, (result) => result._id[0]);
		const currentDayTagsUsage = _.keyBy(currentDayTags, (result) => result._id[0]);
		// console.log("---- currentWeekTagsUsage, currentDayTagsUsage :", currentWeekTagsUsage, currentDayTagsUsage)
		tags = _.map(tags, (tag) => {
			// console.log("currentDayTagsUsage[tag._id] : ", currentDayTagsUsage[tag._id])
			tag.numberOfQuestionsByDate = _.get(currentDayTagsUsage[tag._id], 'count') || 0;
			tag.noOfQuestionsInSevenDays = _.get(currentWeekTagsUsage[tag._id], 'count') || 0;
			tag.questionsCount = _.get(totalTagsUsage[tag._id], 'count') || 0;
			return tag;
		});
		tags.sort((a, b) => ((a.questionsCount > b.questionsCount) ? -1 : 1));
		return tags;
	} catch (e) {
		console.error('Exception occurred while creating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const getTagsShort = async () => {
	try {
		const tags = await TagsModel.find({});
		return tags;
	} catch (error) {
		return {
			error: {
				message: error.message,
			},
		};
	}
};

module.exports = {
	getTags,
	getTagsShort,
};