import jwt from 'jsonwebtoken';

let excludeURLS = ['questions'];

function verifyToken(req, res, next) {
    let urlPostFix = req.url.split('/').pop();

    if (excludeURLS.includes(urlPostFix)) {
        next();
        return;
    }
    const tokenHeader = req.headers.authorization;
    if (tokenHeader) {
        try {
            let decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
            let userId = req.params.userId;
            if (userId == decoded.data.userId) {
                next();
            } else {
                console.log("Invalid userId found");
                res.status(401).json({ msg: 'Unauthorized!' });
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Server error', err });
        }
    } else {
        res.status(401).json({ msg: 'Unauthorized!' });
    }
}

const headers = (req, res, next) => {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
}


function AuthTokenMiddleWare(app) {
    let callback = app.use.bind(app);
    callback('/login', headers)
    callback('/users/:userId', headers)
    callback('/users/:userId', verifyToken); // middleware for all apis with prefix '/users' 
}


export { AuthTokenMiddleWare }
