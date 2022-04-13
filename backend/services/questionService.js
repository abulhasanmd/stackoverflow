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
		const que = await Question.find({ }).lean();
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
                    const tag = await Tag.findById(k)
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

const updateQuestion = async ({params, body}) => {
    console.log(`Entering questionService.updateQuestion with params: ${params} && payload:${body}`);
    try {
      const questionResponse = await Question.updateOne(
        { _id: params.questionId },
        { $set: body },
      ).exec();
      console.log(`update question response :${questionResponse}`);
      if (questionResponse) {
        return { data: { message: `Question updated Successfully` } };
      }
      return { error: { message: 'Some error occured while updating question' } };
    } catch (e) {
      console.error('Exception occurred while updating question', e);
      return { error: { message: e.message } };
    }
};

const addBookmark = async (body) => {
    try {
        const userResponse = await User.updateOne({
            _id: body.createdBy
        }, {
            $push: {
                bookmarks: body.questionId
            }
        }).exec();
        if (userResponse) {
            return {
                data: {
                    message: `Bookmark created Successfully`
                }
            };
        }
        return {
            error: {
                message: 'Some error occured while creating Bookmark'
            }
        };
    } catch (e) {
        console.error('Exception occurred while creating Bookmark', e);
        return {
            error: {
                message: e.message
            }
        };
    }
};

module.exports = {
	postQuestion,
    updateQuestion,
	getAllQuestions,
	addBookmark
};