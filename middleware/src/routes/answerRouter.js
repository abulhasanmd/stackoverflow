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

router.post('/get-answer-by-questionid', async (req, res) => {
	sendMessage(
		process.env.ANSWER_TOPIC,
		req.body,
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

router.post('/update-answer', async (req, res) => {
	sendMessage(
		process.env.ANSWER_TOPIC,
		req.body,
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


module.exports = router;