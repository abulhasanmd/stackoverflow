const { log } = require('console');
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

const getAllQuestions = async (msg) => {
    let body = msg.body;
    let query = msg.query;
    let params = msg.params;
    let filter = query.filter;
	try {
		const que = await Question.find({ }).lean();
		if(que)
        {
            for(let i=0;i<que.length;i++)
            {
                var tagArray = await Tag.find({_id: {$in: que[i].tags}});
                que[i].tags = tagArray;
                // const tags = Array.from(que[i].tags);
                // que[i].tags=[];
                // let tagNames=[];
                // for(let i=0;i<tags.length;i++)
                // {
                //     let k = tags[i].toString();
                //     const tag = await Tag.findById(k)
                //     tagNames.push(tag?.name);
                // }
                // que[i].tags = Array.from(tagNames);
            }

            if(filter=="Interesting")
            {
                que.sort((a, b) => (a.modifiedOn > b.modifiedOn) ? -1 : 1);

            }else if(filter=="Hot")
            {
                que.sort((a, b) => (a.views > b.views) ? -1 : 1);
            }
            else if(filter=="Score")
            {
                que.sort((a, b) => (a.score > b.score) ? -1 : 1);
            }
            else if(filter=="Unanswered")
            {
                que.filter(function(item) { 
                    return item.answers.length>0
                });
                que.sort((a, b) => (a.score > b.score) ? -1 : 1);
            }


            return {
				data: que
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