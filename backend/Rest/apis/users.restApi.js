async function getUsers(req, res) {
    var data = {body: req.body}
    kafka.make_request('getUsers', data, function(err, results) {
        res.json(results.response).status(results.statusCode)
    })
}

async function getUserById(req, res) {
    var data = {body: req.body}
    kafka.make_request('getUserById', data, function(err, results) {
        res.json(results.response).status(results.statusCode)
    })
}

let endpoints = {
    '/users/': [{
        method: 'GET',
        callbacks: [getUsers] 
    }],
    '/users/:userId': [{
        method: 'GET',
        callbacks: [getUserById] 
    }]
}

export { endpoints }
