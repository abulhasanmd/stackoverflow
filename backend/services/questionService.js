const { log } = require('console');
const Question = require('../models/Question');
const Tag = require('../models/Tag');
const User = require('../models/User');
var _ = require('lodash');


async function getTags(tagIds) {
    let tagsInfo = await Tag.find({_id: {$in: tagIds}}).lean();
    return tagsInfo;
}

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

function addSortFunc(que, filter){
    switch(filter) {
        case 'Interesting':
            que.sort({modifiedOn: -1});break
        case 'Hot':
            que.sort({views: -1});break
        case 'Score':
            que.sort({score: -1});break
        case 'Unanswered':
            //TO-DO
            que.sort({modifiedOn: -1});break
    }
}

const getAllQuestions = async (data) => {
    let {body, query, params} = data
    let filter = body.filter;
	try {
		let que = Question.find({reviewStatus: 'approved'}).lean();
        await addSortFunc(que, filter)
        let tagIds =  _.uniq(_.map(que, 'tags').flat(1));
        let tags = await getTags(tagIds);
        let tagsMap = _.keyBy(tags, '_id')
        que = _.map(que, (question) => {
            question.tags = _.map(question.tags, (tag) => tagsMap[tag._id])
            return question;
        })
        return {
            data: que
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