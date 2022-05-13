const _ = require('lodash');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Logs = require('../models/logs');
let utils = require('../utils.js');

const getCommentsByResourceId = async (params) => {
	console.log('Entering commentService.getCommentsByResourceId');
	try {
		let commentsResponse = await Comment.find({
			resourceId: params.resourceId,
		}).lean();
		const uniqUserIds = _.uniq(_.map(commentsResponse, 'createdBy._id'));
		const userInfo = await User.find({
			$in: uniqUserIds,
		}).lean();
		const usersHashMap = _.keyBy(userInfo, '_id');

		commentsResponse = _.map(commentsResponse, (comment) => {
			const userId = comment.createdBy._id.toString();
			comment.createdBy = usersHashMap[userId];
			return comment;
		});
		console.log(`get comment response :${JSON.stringify(commentsResponse)}`);
		return {
			data: commentsResponse,
		};
	} catch (e) {
		console.error('Exception occurred while getting comments', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

const addComment = async (body) => {
	let userId = body.createdBy._id;
	let {resourceId, comment} = body 
	console.log(`Entering commentService.addComment,payload is ${body}`);
	try {
		const comment = {
			...body,
		};
		const commentResponse = await Comment.create(comment);
		console.log(`add comment response :${commentResponse}`);
		if (commentResponse) {
			await utils.log('comment', "added", userId, resourceId)
			return {
				data: {
					message: 'Comment created Successfully',
				},
			};
		}
		return {
			error: {
				message: 'Some error occured while creating comment',
			},
		};
	} catch (e) {
		console.error('Exception occurred while creating comment', e);
		return {
			error: {
				message: e.message,
			},
		};
	}
};

module.exports = {
	getCommentsByResourceId,
	addComment,
};