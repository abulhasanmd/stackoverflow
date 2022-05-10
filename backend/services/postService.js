const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
var _ = require('lodash')

function parseTagNames(searchq = '') {
    var tagRegex = /\[([^\][]*)]/g;
    let tagNames = [], m;
    while ( m = tagRegex.exec(searchq) ) {
        tagNames.push(m[1]);
    }
    return tagNames
}

async function getQueryMatchCond(searchq = '') {
    var self = this;
    if(!searchq) {
        return {}
    }
    let parseArr = searchq.split(':');
    let key = parseArr[0], value = parseArr[1];
    let tagNames = parseTagNames(searchq)
    self.searchTitle = '', self.searchDescription = ''
    if(tagNames.length) {
        self.searchTitle = `Results for Query ${searchq} tagged with ${tagNames[0]}`
        let tagRecords = await TagsModel.find({name:{$regex:tagNames[0], $options: 'i'}}, {_id: 1, name: 1, descr: 1}) .lean()
        let tagIds = _.map(tagRecords, '_id');
        _.map(tagRecords, (tag) => {
            self.searchDescription+= `${tag.descr}\n`
        });
        return {tags: {$in : tagIds}}
    }
    switch(key) {
        case 'user':
            let usersRecords = await UserModel.find({name:{$regex:value, $options: 'i'}}, {_id: 1}) .lean()
            let userIds = _.map(usersRecords, '_id');
            return {createdBy: {$in : userIds}}
        case 'isaccepted':
            return {reviewStatus: 'approved'}
        case 'is':
            return {}
        default:
            console.log("##### key", key)
            return { title: {$regex: key, $options: 'i'}}
    }

}

function getQueryModel(searchq = ''){
    let parseArr = searchq.split(':');
    let key = parseArr[0], value = parseArr[1];
    if(key == 'is') {
        if(value == 'answer') {
            return AnswerModel
        }
    }
    return QuestionsModel;
}

async function getAllPosts(data) {
    var self = this;
    let {body, query, params} = data;
    let {searchq, filter, tagIds} = body;
    if(false) { //By-Passing redis, considering dynamic search
        let redisData = await redisClient.get('allposts');
        if(redisData != "null" && redisData) return JSON.parse(redisData);
    }
    let dbquery = getQueryModel(searchq);
    let searchqMatchCond = await getQueryMatchCond.call(self, searchq);
    dbquery = dbquery.find(searchqMatchCond)
    switch(filter) {
        case 'votes':
            dbquery.sort({votes : 1});break;
        case 'newest':
            dbquery.sort({createdOn: 1});break;
        default:
            dbquery.sort({votes : 1});break;
    }
    let posts = await dbquery.lean();
    return {posts, total: posts.length, searchTitle: self.searchTitle, searchDescription: self.searchDescription}

}

module.exports = {
	getAllPosts
};