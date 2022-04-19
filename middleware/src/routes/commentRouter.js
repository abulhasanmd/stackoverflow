const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();

router.post('/post-comment', async (req, res) => {
	sendMessage(
		process.env.COMMENT_TOPIC,
		req.body,
		'POST-COMMENT',
		(error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.get('/get-comment-by-resourceid/:resourceId', async (req, res) => {
	sendMessage(
		process.env.COMMENT_TOPIC,
		req.params,
		'GET-COMMENT-BY-RESOURCEID',
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