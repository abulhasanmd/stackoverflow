const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();

router.post('/create-vote', async (req, res) => {
	sendMessage(
		process.env.VOTE_TOPIC,
		req.body,
		'CREATE-VOTE',
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