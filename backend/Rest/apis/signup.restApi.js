import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';
var saltRounds = 10;

function signUp(req, res) {
    var data = {body: req.body, params: req.params, query: req.query}
    kafka.make_request('signUp', data, function(err, results) {
        console.log("@@@siggnup ===> ", err, results)
        res.json(results.response).status(results.statusCode)
    })
}

let endpoints = {
    '/signup': [{
        method: 'POST',
        callbacks: [signUp]
    }]
}

export { endpoints }