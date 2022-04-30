const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.get('/get-tags-used-in-questions/:userId', async (req, res, next) => {
	const userId = req.params.userId;
	sendMessage(
		process.env.USER_TOPIC, {
			userId,
		},
		'GET-TAGS-USED-IN-QUESTIONS',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	)
});

router.get('/get-bookmarks/:userId', async (req, res, next) => {
	const userId = req.params.userId;
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
		}
	);
});

router.get('/get-reputation-activity/:userId', async (req, res, next) => {
	const userId = req.params.userId;
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
		}
	)
});

module.exports = router;