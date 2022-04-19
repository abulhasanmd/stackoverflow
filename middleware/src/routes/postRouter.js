const express = require('express');
const { sendMessage } = require('../kafka/producer');
const router = express.Router();

router.pogetst('/get-posts', async (req, res) => {
	let {body, query, params} = req
	let data  = {body, query, params}
	sendMessage(
		process.env.POST_TOPIC,
		data,
		'GET-POSTS',
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