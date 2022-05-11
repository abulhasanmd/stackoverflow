const TagsModel = require('../models/Tag');
const QuestionsModel = require('../models/Question');
var _ = require('lodash')

const getTags = async (msg) => 
{
    let limit = 100
	let searchWord = msg.query.search;
    let matchCond = {}
    let lastWeek = new Date();
    let lastDay = new Date();
    lastWeek.setDate(lastWeek.getDate() -7);
    lastDay.setDate(lastWeek.getDate() -1);
	try 
    {
		if (searchWord) {
            limit = 5
            matchCond = {name:{$regex:searchWord, $options: 'i'}};
        } 
        let tags = await TagsModel.find(matchCond).limit(limit).lean();
        let tagIds = _.map(tags, '_id')
        let totalTags =await QuestionsModel.aggregate([ {$match: {tags: {$in: tagIds}}}, {$group : {_id:"$tags", count:{$sum:1}}} ])
        let currentWeekTags =await QuestionsModel.aggregate([ {$match: {tags: {$in: tagIds}, createdOn: {$gte: lastWeek}}}, {$group : {_id:"$tags", count:{$sum:1}}} ])
        let currentDayTags =await QuestionsModel.aggregate([ {$match: {tags: {$in: tagIds}, createdOn: {$gte: lastDay}}}, {$group : {_id:"$tags", count:{$sum:1}}} ])
        
        let totalTagsUsage = _.keyBy(totalTags, (result) => {return result._id[0]})
        let currentWeekTagsUsage = _.keyBy(currentWeekTags, (result) => {return result._id[0]})
        let currentDayTagsUsage = _.keyBy(currentDayTags, (result) => {return result._id[0]})
        // console.log("---- currentWeekTagsUsage, currentDayTagsUsage :", currentWeekTagsUsage, currentDayTagsUsage)
        tags = _.map(tags, function(tag) {
            // console.log("currentDayTagsUsage[tag._id] : ", currentDayTagsUsage[tag._id])
            tag.numberOfQuestionsByDate = _.get(currentDayTagsUsage[tag._id], 'count') || 0
            tag.noOfQuestionsInSevenDays = _.get(currentWeekTagsUsage[tag._id], 'count') || 0
            tag.questionsCount = _.get(totalTagsUsage[tag._id], 'count') || 0
            return tag
        })
        tags.sort((a, b) => (a.questionsCount > b.questionsCount) ? -1 : 1);
        return tags
	} 
    catch (e) 
    {
		console.error('Exception occurred while creating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	getTags
};