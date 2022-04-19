const { log } = require('console');
const Question = require('../models/Question');
const Tag = require('../models/Tag');
const User = require('../models/User');

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

const getAllQuestions = async (data) => {
    let {body, query, params} = data
    let filter = body.filter;
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

const getQuestionById = async (msg) => 
{
    let body = msg.body;
    let query = msg.query;
    let params = msg.params;
    console.log(`Entering questionService get Question By ID with params: ${params} && payload:${body}`);
    try {
     
      const questionResponse = await Question.findById(params.questionId).lean();
      console.log(`update question response :${questionResponse}`);
      if (questionResponse) 
      {
        const viewUpdateResponse = await Question.updateOne(
            { _id: params.questionId },
            { $set: {"views": questionResponse.views+1} },
          ).exec();
          questionResponse.views = questionResponse.views + 1;
          let userId = questionResponse.createdBy._id.toString();
          const userResponse = await User.findById(userId).lean();

          questionResponse.user = userResponse;

        return { data:  questionResponse};
      }
      return { error: { message: 'Some error occured while getting question by ID' } };
    } catch (e) {
      console.error('Exception occurred while while getting question by ID', e);
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
	addBookmark,
    getQuestionById
};