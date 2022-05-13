const Logs = require('./models/logs');
const TagsModel = require('./models/Tag');
const UserModel = require('./models/User');
const AnswerModel = require('./models/Answer');
const QuestionsModel = require('./models/Question');
const CommentsModel = require('./models/Comment');
var _ = require('lodash')


async function getTags(tagIds) {
	const tagsInfo = await TagsModel.find({
		_id: {
			$in: tagIds,
		},
	}).lean();
	return tagsInfo;
}

async function resolveTags(posts) {
	const tagIds = _.uniq(_.map(posts, 'tags').flat(1));
	const tags = await getTags(tagIds);
	const tagsMap = _.keyBy(tags, '_id');
	posts = _.map(posts, (question) => {
		question.tags = _.map(question.tags, (tag) => tagsMap[tag._id]);
		return question;
	});
	return posts;
}

async function resolveUsers(posts) {
	const userIds = _.uniq(_.map(posts, 'createdBy._id'));
	const userDetails = await UserModel.find({
		_id: {
			$in: userIds,
		},
	}).lean();
	const usersMap = _.keyBy(userDetails, '_id');
	posts = _.map(posts, (post) => {
		// console.log("### post : ", post)
		if(_.get(post, 'createdBy._id')) {
			post.createdBy = usersMap[post.createdBy._id];
		}
		return post;
	});
	return posts;
}

async function log(what, comment='', createdBy, resourceId) {
    var data = {what, comment, createdBy, resourceId};
    console.log("#### logged ", data, " event : ", what);
    let result = await Logs.create({what, comment, createdBy, resourceId})
    return result;
}


async function getQuestionsById(questionIds) {
    let questions = await QuestionsModel.find({_id: {$in: questionIds}}).lean()
    questions = await resolveUsers(questions)
    questions = await resolveTags(questions)
    return questions

}

let getQuestionsUserAnswered = async (userId) => {
    // console.log("### getQuestionsUserAnswered : ", userId);
	const answers = await AnswerModel.find({ "createdBy._id": userId }, { questionId: 1 }).sort({ votes: -1 }).limit(10).lean();
	const questionIds = _.uniq(_.map(answers, 'questionId'));
    // console.log("##### questionIds : ", questionIds);
	const questions = await getQuestionsById(questionIds);
    // console.log("##### questions : ", questions);
	return questions;
};

module.exports = {
    log,
    getQuestionsById,
    resolveTags,
    getQuestionsUserAnswered
}