const Answer = require('../models/Answer');
const uuid = require('uuidv4');


const getAnswersByQuestionId = async (body) => {
  console.log('Entering answerService.getAnswersByResourceId');
  try {
    const answersResponse = await Answer.find({ questionId: body.questionId }).exec();
    console.log(`get answer respoinse :${answerResponse}`);
    return { data: answersResponse };
  } catch (e) {
    console.error('Exception occurred while getting answers', e);
    return { error: { message: e.message } };
  }
};

const addAnswer = async (body) => {
  console.log(`Entering answerService.addAnswer,payload is ${body}`);
  try {
    const newAnswerId = `a-${uuid()}`
    const answer = {_id: newAnswerId, ...body }
    const answerResponse = await Answer.create(answer);
    console.log(`add answer respoinse :${answerResponse}`);
    if (answerResponse) {
      return { data: { message: `Answer ${newAnswerId} created Successfully` } };
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
        { _id: params.questionId },
        { $set: body },
      ).exec();
      console.log(`update answer respoinse :${answerResponse}`);
      if (answerResponse) {
        return { data: { message: `Answer updated Successfully` } };
      }
      return { error: { message: 'Some error occured while updating answer' } };
    } catch (e) {
      console.error('Exception occurred while updating updating answer', e);
      return { error: { message: e.message } };
    }
  };

module.exports = {
    getAnswersByQuestionId, addAnswer, updateAnswer
};