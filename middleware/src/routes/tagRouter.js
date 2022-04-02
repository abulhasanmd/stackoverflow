const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();


router.get('/get-tags', async (req, res) => {
	let msg = {
		body: req.body,
		params: req.params,
		query: req.query
	}
	sendMessage(
		process.env.TAG_TOPIC,
		msg,
		'GET-TAGS',
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