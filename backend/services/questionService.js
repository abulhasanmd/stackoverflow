const { log } = require('console');
const Question = require('../models/Question');
const Tag = require('../models/Tag');
const User = require('../models/User');
var _ = require('lodash');

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

async function getTags(tagIds) {
    let tagsInfo = await Tag.find({_id: {$in: tagIds}}).lean();
    return tagsInfo;
}

const getQuestionById = async (msg) => 
{
    let {body, query, params} = msg;
    let {questionId} = params
    console.log(`Entering questionService get Question By ID with params: ${params} && payload:${body}`);
    try {
        let queDetails = await Question.findOneAndUpdate({_id: questionId }, { $inc: { views: 1}}, {returnNewDocument: true}).lean();
        let tags = await getTags(queDetails.tags)
        let tagsMap = _.keyBy(tags, '_id');
        /**  resolve tags in question **/
        queDetails.tags = _.map(queDetails.tags, (tag) => tagsMap[tag._id])
        //end
        /** resolving userInfo in questions **/ 
        let userId = queDetails.createdBy._id.toString();
        let userDetails = await User.findById(userId).lean();
        Object.assign(queDetails.createdBy, userDetails)
        //end
        return queDetails;
    } catch (e) {
      console.error('Exception occurred while while getting question by ID', e);
      return { error: { message: e.message } };
    }
};

const addBookmark = async (body) => {
    let userId = body.createdBy, questionId = body.questionId
    try {
        const userResponse = await User.updateOne({
            _id: userId
        }, 
        [{
            $set: {
                bookmarks: {
                    $cond: [
                        {
                            $in: [`${questionId}`, "$bookmarks"]
                        },
                        {
                            $setDifference: ["$bookmarks", [`${questionId}`]]
                        },
                        {
                            $concatArrays: ["$bookmarks", [`${questionId}`]]
                        }
                    ]
                }
            }
        }
    ]).exec();
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