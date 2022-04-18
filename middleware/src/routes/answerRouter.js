const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();

router.post('/post-answer', async (req, res) => {
	sendMessage(
		process.env.ANSWER_TOPIC,
		req.body,
		'POST-ANSWER',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.get('/get-answer-by-questionid/:questionId', async (req, res) => {
	sendMessage(
		process.env.ANSWER_TOPIC,
		req.params,
		'GET-ANSWER-BY-QUESTIONID',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.put('/update-answer', async (req, res) => {
	sendMessage(
		process.env.ANSWER_TOPIC,
		{params : req.params , body : req.body},
		'UPDATE-ANSWER',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.put('/best-answer', async (req, res) => {
	sendMessage(
		process.env.ANSWER_TOPIC,
		{params : req.params , body : req.body},
		'BEST-ANSWER',
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