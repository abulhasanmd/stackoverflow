const Comment = require('../models/Comment');
const User = require('../models/User');
var _ = require('lodash');

const getCommentsByResourceId = async (params) => {
  console.log('Entering commentService.getCommentsByResourceId');
  try {
    var commentsResponse = await Comment.find({ resourceId: params.resourceId }).lean();
    var uniqUserIds = _.uniq(_.map(commentsResponse, 'createdBy._id'));
    let userInfo = await User.find({$in: uniqUserIds}).lean();
    let usersHashMap = _.keyBy(userInfo, '_id');

    commentsResponse = _.map(commentsResponse, (comment) => {
      let userId = comment.createdBy._id.toString();
      comment.createdBy = usersHashMap[userId];
      return comment;
  });
    console.log(`get comment response :${JSON.stringify(commentsResponse)}`);
    return { data: commentsResponse };
  } catch (e) {
    console.error('Exception occurred while getting comments', e);
    return { error: { message: e.message } };
  }
};

const addComment = async (body) => {
  console.log(`Entering commentService.addComment,payload is ${body}`);
  try {
    const comment = {...body }
    const commentResponse = await Comment.create(comment);
    console.log(`add comment response :${commentResponse}`);
    if (commentResponse) {
      return { data: { message: `Comment created Successfully` } };
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
