var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
const LogsModel = require('../models/logs');

async function fetchLogs(resourceId) {
    try {
        let logs = await LogsModel.find({resourceId});
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