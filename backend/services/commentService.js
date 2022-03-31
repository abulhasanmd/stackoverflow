const Comment = require('../models/Comment');
const uuid = require('uuidv4');


const getCommentsByResourceId = async (body) => {
  console.log('Entering commentService.getCommentsByResourceId');
  try {
    const commentsResponse = await Comment.find({ resourceId: body.resourceId }).exec();
    console.log(`get comment respoinse :${commentResponse}`);
    return { data: commentsResponse };
  } catch (e) {
    console.error('Exception occurred while getting comments', e);
    return { error: { message: e.message } };
  }
};

const addComment = async (body) => {
  console.log(`Entering commentService.addComment,payload is ${body}`);
  try {
    const newCommentId = `c-${uuid()}`
    const comment = {_id: newCommentId, ...body }
    const commentResponse = await Comment.create(comment);
    console.log(`add comment respoinse :${commentResponse}`);
    if (commentResponse) {
      return { data: { message: `Comment ${newCommentId} created Successfully` } };
    }
    return { error: { message: 'Some error occured while creating comment' } };
  } catch (e) {
    console.error('Exception occurred while creating comment', e);
    return { error: { message: e.message } };
  }
};

module.exports = {
    getCommentsByResourceId, addComment
};
