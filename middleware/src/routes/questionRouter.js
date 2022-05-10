/* eslint-disable no-undef */
const express = require('express');
const {
	sendMessage,
} = require('../kafka/producer');

const router = express.Router();
// const redis = require('redis');
// const redisClient = redis.createClient(6379);

// for creating question
router.post('/post-question', async (req, res) => {
	sendMessage(
		process.env.QUESTION_TOPIC,
		req.body,
		'POST-QUESTION',
		async (error, data) => {
			if (data) {
				// await redisClient.del('allposts');
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.get('/get-allquestion', async (req, res) => {
	const {
		body,
		query,
		params,
	} = req;
	const data = {
		body,
		query,
		params,
	};
	sendMessage(
		process.env.QUESTION_TOPIC,
		data,
		'GET-ALLQUESTION',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.put('/update-question', async (req, res) => {
	sendMessage(
		process.env.QUESTION_TOPIC, {
			...req.params,
			...req.body
		},
		'UPDATE-QUESTION',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.get('/add-bookmark', async (req, res) => {
	sendMessage(
		process.env.QUESTION_TOPIC,
		req.body,
		'ADD-BOOKMARK',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.get('/get-questionbyid/:questionId', async (req, res) => {
	let msg = {
		body: req.body,
		params: req.params,
		query: req.query
	}
	sendMessage(
		process.env.QUESTION_TOPIC,
		msg,
		'GET-QUESTIONBYID',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

module.exports = router;