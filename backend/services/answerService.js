const Answer = require('../models/Answer');
const Question = require('../models/Question');


const getAnswersByQuestionId = async (body) => {
  console.log('Entering answerService.getAnswersByResourceId');
  try {
    const answersResponse = await Answer.find({ questionId: body.questionId }).exec();
    console.log(`get answer response :${answerResponse}`);
    return { data: answersResponse };
  } catch (e) {
    console.error('Exception occurred while getting answers', e);
    return { error: { message: e.message } };
  }
};

const addAnswer = async (body) => {
  console.log(`Entering answerService.addAnswer,payload is ${body}`);
  try {
    const answer = {...body }
    const answerResponse = await Answer.create(answer);
    console.log(`add answer response :${answerResponse}`);
    if (answerResponse) {
      return { data: { message: `Answer created Successfully` } };
    }
    return { error: { message: 'Some error occured while creating answer' } };
  } catch (e) {
    console.error('Exception occurred while creating answer', e);
    return { error: { message: e.message } };
  }
};

const updateAnswer = async ({params, body}) => {
    console.log(`Entering answerService.updateAnswer with params: ${params} && payload:${body}`);
    try {
      const answerResponse = await Answer.updateOne(
        { _id: params.answerId },
        { $set: body },
      ).exec();
      console.log(`update answer response :${answerResponse}`);
      if (answerResponse) {
        return { data: { message: `Answer updated Successfully` } };
      }
      return { error: { message: 'Some error occured while updating answer' } };
    } catch (e) {
      console.error('Exception occurred while updating answer', e);
      return { error: { message: e.message } };
    }
};

  const bestAnswer = async ({params, body}) => {
    console.log(`Entering answerService.bestAnswer with params: ${params} && payload:${body}`);
    try {
      const bestAnswerObj = await Answer.findOne({questionId: body.questionId, isBestAnswer: true}).exec();  
      if(!bestAnswerObj){
        const answerResponse = await Answer.updateOne(
          { _id: params.answerId },
          { $set: {isBestAnswer: true} },
          {
            $inc: {
                score: 15
            }
        }
        ).exec();
        console.log(`best answer response :${answerResponse}`); 
        if (answerResponse) {
          return { data: { message: `Best Answer marked Successfully` } };
        }
      }else{
        const answerResponse = await Answer.updateOne(
          { _id: bestAnswerObj._id },
          { $set: {isBestAnswer: false} },
          {
            $inc: {
                score: -15
            }
          }
        ).exec();
        console.log(`removed best answer response :${answerResponse}`); 
        const markBestAnswerResponse = await Answer.updateOne(
          { _id: params.answerId },
          { $set: {isBestAnswer: true} },
          {
            $inc: {
                score: 15
            }
          }
        ).exec();
        console.log(`marked best answer response :${markBestAnswerResponse}`); 
        if (answerResponse && markBestAnswerResponse) {
          return { data: { message: `Updated new Best Answer Successfully` } };
        }
        return { error: { message: 'Some error occured while updating answer' } };
      }
      return { error: { message: 'Some error occured while marking best answer' } };
    } catch (e) {
      console.error('Exception occurred while marking best answer', e);
      return { error: { message: e.message } };
    }
  };


  module.exports = {
    getAnswersByQuestionId, addAnswer, updateAnswer, bestAnswer
};
