import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';
var saltRounds = 10;

async function signUp(data, callback) {
    try {
        let {body, params, query} = data
        const username = body.username;
        const password = body.password;
        const email = body.email;
        var userInstance = ModelFactory.getUserInstance();
        console.log("### signUp", data)
        var user = await userInstance.findOne({ email })
        if(user) {
            callback(null, {response: { msg: 'Email already exists' }, statusCode: 401} ); return;
        } else {
            const encryptedPassword = bcrypt.hashSync(password, saltRounds);
            let newUserId = `u-${uuid()}`
            let newUserObj = {
                _id: newUserId,
                username,
                email,
                password: encryptedPassword
    
            }
            var newUserCreatedRes = await userInstance.create(newUserObj);
            console.log("### newUserCreatedRes :", newUserCreatedRes)
            callback(null, {response: { username, email, message: 'User Created Successfully' }, statusCode: 200} ); return;
        }
    } catch(err) {
        console.log("##### err : ", err)
        callback(null, {response: err, statusCode: 400});
    }

}

export { signUp }