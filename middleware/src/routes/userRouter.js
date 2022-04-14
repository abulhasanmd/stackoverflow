const express = require('express');
const redis = require('redis');

const {
	sendMessage,
} = require('../kafka/producer');

const router = express.Router();

const redisClient = redis.createClient(6379);

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.get('/get-all-users', (req, res, next) => {
	redisClient.get('users', (err, data) => {
		if (err) throw err;
		if (data !== null) {
			res.status(200).json(data);
		} else {
			next();
		}
	});
}, async (req, res, next) => {
	sendMessage(
		process.env.USER_TOPIC, req.query,
		'GET-ALL-USERS',
		(error, data) => {
			if (data) {
				redisClient.setEx('users', 3600, data);
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

router.get('/get-tags-used-in-questions/:userId', async (req, res, next) => {
	const {
		userId,
	} = req.params;
	sendMessage(
		process.env.USER_TOPIC, {
			userId,
		},
		'GET-TAGS-USED-IN-QUESTIONS',
		(error, data) => {
			if (data) {
				redisClient.setEx('users', 3600, data);
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

router.get('/get-bookmarks/:userId', async (req, res, next) => {
	const {
		userId,
	} = req.params;
	sendMessage(
		process.env.USER_TOPIC, {
			userId,
		},
		'GET-BOOKMARKS',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

router.get('/get-reputation-activity/:userId', async (req, res, next) => {
	const {
		userId,
	} = req.params;
	sendMessage(
		process.env.USER_TOPIC, {
			userId,
		},
		'GET-REPUTATION-ACTIVITY',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

router.get('/profile/:userId', async (req, res, next) => {
	const {
		userId,
	} = req.params;
	sendMessage(
		process.env.USER_TOPIC, {
			userId,
		},
		'GET-USER-PROFILE',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

router.get('/:userId/posts', async (req, res, next) => {
	let {body, params, query} = req;
	let data = {body, params, query}
	const {
		userId,
	} = req.params;
	sendMessage(
		process.env.USER_TOPIC, data, 'GET-USER-POSTS',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

router.put('/profile', async (req, res, next) => {
	let {body, params, query} = req;
	let data = {body, params, query}
	const {
		userId,
	} = req.params;
	sendMessage(
		process.env.USER_TOPIC, data, 'UPDATE-USER-PROFILE',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		},
	);
});

module.exports = router;