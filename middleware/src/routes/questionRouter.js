const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();

router.post('/post-question', async (req, res) => {
	sendMessage(
		process.env.QUESTION_TOPIC,
		req.body,
		'POST-QUESTION',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.get('/get-allquestion', async (req, res) => {
	sendMessage(
		process.env.QUESTION_TOPIC,
		req.body,
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

module.exports = router;