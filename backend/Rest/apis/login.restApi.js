import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(req, res) {
    var data = {body: req.body}
    kafka.make_request('login', data, function(err, results) {
        res.json(results.response).status(results.statusCode)
    })
}

let endpoints = {
    '/login': [{
        method: 'POST',
        callbacks: [login] // last index function is always a rest function
    }]
}

export { endpoints }
