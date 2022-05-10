var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
const LogsModel = require('../models/logs');
let _ = require('lodash')

async function fetchLogs(resourceId) {
    try {
        let logs = await LogsModel.find({resourceId}).lean();
        let userIds = _.map(logs, 'createdBy')
        let usersInfo = await UserModel.find({_id: {$in: userIds}});
        let usersInfoMap = _.keyBy(usersInfo, '_id')
        logs = _.map(logs, (log) => {
            log.createdBy = usersInfoMap[log.createdBy]
            return log;
        })
        return {response: logs, statusCode: 200}
    } catch(err) {
        console.log("@@@@ err", err);
        response = { msg: 'Failed to fetch logs' }
        statusCode = 400
        return {response, statusCode};
    }
}

module.exports = {
    fetchLogs
}