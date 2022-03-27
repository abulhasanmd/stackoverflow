const log = console.log;
import _ from 'lodash';

async function getUsers(data, callback) {
    let userInstance = ModelFactory.getUserInstance();
    try {
        let users = await userInstance.find();
        if(!users) {
            callback(null, {response: { msg: 'Users not exists' }, statusCode: 400} ); return;
        }
        users.map(userObj => delete userObj.password);
        callback(null, {response: users, statusCode: 200} ); return;
    } catch(err) {
        console.trace("#### err", err);
        callback(null, {response: {msg: 'Failed to get users data'}, statusCode: 400} ); return;
    }
}

async function getUserById(data, callback) {
    let {params} = data
    let userId = params.userId;
    let userInstance = ModelFactory.getUserInstance();
    try {
        let user = await userInstance.findOne({_id: userId})
        if(!user) {
            callback(null, {response: { msg: 'User not exists' }, statusCode: 400} ); return;
        }
        delete user.password;
        callback(null, {response: user, statusCode: 200} ); return;
    } catch(err) {
        console.trace("#### err", err);
        callback(null, {response: {msg: 'Failed to get user profile'}, statusCode: 400} ); return;
    }
}

export { getUsers, getUserById };