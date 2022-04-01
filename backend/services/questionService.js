const Question = require('../models/Question');
const Tag = require('../models/Tag');

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

const getAllQuestions = async (body) => {
	try {
		const que = await QuestionsModel.find({ }).lean();
		if(que)
        {
            for(let i=0;i<que.length;i++)
            {
                const tags = Array.from(que[i].tags);
                que[i].tags=[];
                let tagNames=[];
                for(let i=0;i<tags.length;i++)
                {
                    let k = tags[i].toString();
                    const tag = await TagsModel.findById(k)
                    tagNames.push(tag?.name);
                }
                que[i].tags = Array.from(tagNames);
            }
            return {
				data: que,
			};
        }else
        {
			return {
				error: {
					message: 'Error fetching questions',
				},
			};
        }
	} catch (e) {
		console.error('Exception occurred while creating question', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	postQuestion,
	getAllQuestions
};