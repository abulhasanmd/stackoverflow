const TagsModel = require('../models/Tag');
const UserModel = require('../models/User');
const AnswerModel = require('../models/Answer');
const QuestionsModel = require('../models/Question');
var _ = require('lodash')
var uuid = require('uuidv4');
var bcrypt = require('bcryptjs');
var saltRounds = 10;

async function signUp(data) {
    try {
        let {body, params, query} = data
        const username = body.username;
        const password = body.password;
        const email = body.email;
        // var userInstance = ModelFactory.getUserInstance();
        console.log("### signUp", data)
        var user = await UserModel.findOne({ emailId: email })
        console.log("### signUp user : ", user)
        if(user) {
            return {response: { msg: 'Email already exists' }, statusCode: 401};
        } else {
            const encryptedPassword = bcrypt.hashSync(password, saltRounds);
            let newUserId = `u-${uuid.uuid()}`
            let newUserObj = {
                // _id: newUserId,
                name: username,
                emailId: email,
                password: encryptedPassword
    
            }
            var newUserCreatedRes = await UserModel.create(newUserObj);
            console.log("### newUserCreatedRes :", newUserCreatedRes)
            return {response: { username, email, message: 'User Created Successfully' }, statusCode: 200};
        }
    } catch(err) {
        console.log("##### err : ", err)
        return {response: err, statusCode: 400};
    }

}

module.exports = {
    signUp
}