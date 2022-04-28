const Tag = require('../models/Tag');
const Question = require('../models/Question');
const questionConstants = require('../constants/questionConstants');

const getTags = async () => {
  console.log('Entering adminService.getTags');
  try {
    const tags = await Tag.find().exec();
    if (tags.length < 1) {
      return { error: { message: 'No Tags found' } };
    }
    return { data: tags };
  } catch (e) {
    console.error('Exception occurred while getting tags', e);
    return { error: { message: e.message } };
  }
};

const addTag = async (tagRequest) => {
  console.log(`Entering adminService.addTag,params are ${tagRequest}`);
  try {
    const tag = new Tag({
      name: tagRequest.name,
      descr: tagRequest.descr,
      createdBy: tagRequest.admin,
    });
    const tagResponse = await tag.save();
    console.log(`tagrespoinse :${tagResponse}`);
    if (tagResponse) {
      return { data: { message: `Tag ${tagRequest.name} created Successfully` } };
    }
    return { error: { message: 'Some error occured while creating Tag' } };
  } catch (e) {
    console.error('Exception occurred while getting tags', e);
    return { error: { message: e.message } };
  }
};

const getPendingQuestions = async () => {
  console.log('Entering adminService.getPendingQuestions');
  try {
    const questions = await Question.find(
      { reviewStatus: questionConstants.PENDING_STATUS },
    ).exec();
    if (questions.length < 1) {
      return { error: { message: 'No Questions found to be reviewed' } };
    }
    return { data: questions };
  } catch (e) {
    console.error('Exception occurred while getting pendingQuestions', e);
    return { error: { message: e.message } };
  }
};

const updateReviewStatus = async (updateParams) => {
  console.log(`Entering adminService.updateReviewStatus with params:${JSON.stringify(updateParams)}`);
  try {
    const questions = await Question.updateOne(
      { _id: updateParams._id },
      { reviewStatus: updateParams.action },
    ).exec();
    console.log(JSON.stringify(questions));
    if (questions.modifiedCount < 1) {
      return { error: { message: 'No Question found to be updated or status unchanged' } };
    }
    return { data: `Status successfully updated to ${updateParams.action} for the question` };
  } catch (e) {
    console.error('Exception occurred while updating review status', e);
    return { error: { message: e.message } };
  }
};

module.exports = {
  getTags, addTag, getPendingQuestions, updateReviewStatus,
};
