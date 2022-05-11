const TagsModel = require('../models/Tag');
const QuestionsModel = require('../models/Question');


const getTags = async (msg) => 
{
	let searchWord = msg.query.search;
	try 
    {
		if (searchWord) 
        {
            const tags = await TagsModel.find({name:{$regex:searchWord, $options: 'i'}}).limit(5).lean();
            let lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() -7);
            for(let i=0;i<tags.length;i++)
            {
                let tagId = tags[i]._id.toString();
                const que = await QuestionsModel.find({$and: [{tags: tagId}, { "createdOn": { $gte: lastWeek}} ]}).lean();
                let numberOfQuestionsByDate = que.length;
                tags[i].noOfQuestionsInSevenDays = numberOfQuestionsByDate;
            }       
            
            tags.sort((a, b) => (a.questionsCount > b.questionsCount) ? -1 : 1);
            return {
				data: tags,
			};
        
        } else 
        {
            const tags = await TagsModel.find({ }).lean();
            let lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() -7);
            for(let i=0;i<tags.length;i++)
            {
                let tagId = tags[i]._id.toString();
                const que = await QuestionsModel.find({$and: [{tags: tagId}, { "createdOn": { $gte: lastWeek}} ]}).lean();
                let numberOfQuestionsByDate = que.length;
                tags[i].noOfQuestionsInSevenDays = numberOfQuestionsByDate;
            } 

            tags.sort((a, b) => (a.questionsCount > b.questionsCount) ? -1 : 1);
            return tags
        }
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