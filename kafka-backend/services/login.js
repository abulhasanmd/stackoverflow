import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(data, callback) {
    let {body, params, query} = data
    const email = body.email;
    let password = body.password;
    var response, statusCode;
    var usersInstance = ModelFactory.getUserInstance()
    try {
        let user = await usersInstance.findOne({email});
        console.log("#### users :", user, email)
        if (user) {
            let userObj = user;
            var userId = userObj._id;
            let isValidPassword = bcrypt.compareSync(password, userObj.password); // true
            if (isValidPassword == false) {
                response = { msg: 'Login failed' }
                statusCode = 401
                return callback(null, {response, statusCode})
            }
            const token = jwt.sign({
                data: {
                    userId: userId,
                    username: userObj.name,
                    email: userObj.emailId,
                    role: userObj.role,
                }
            }, 'my-secret-key-0001xx01212032432', { expiresIn: '24h' });
            response = {
                token: token,
                msg: 'LoggedIn successfully',
                data: {
                    username: userObj.username,
                    userId: userObj._id
                }
            }
            statusCode = 200
            return callback(null, {response, statusCode})
        } else {
            response = { msg: 'Invalid user name or password' }
            statusCode = 400
            return callback(null, {response, statusCode})
        }
    } catch(err) {
        console.log("@@@@ err", err);
        response = { msg: 'Failed to login' }
        statusCode = 400
        return callback(null, {response, statusCode})
    }
}


export {login}