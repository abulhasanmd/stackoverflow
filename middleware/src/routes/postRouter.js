const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');
const redis = require('redis');

const router = express.Router();
let postService = require('../../../backend/services/postService.js');

router.post('/get-posts', async (req, res, next) => {
	try {
		return next()//By-Passing redis, considering dynamic search
		let data = await redisClient.get('allposts');
		// console.log("##### redis data", data)
		if (data != "null" && data) return res.status(200).json(JSON.parse(data));
		next();
	} catch (err) {
		console.log("### err", err)
		return res.status(400).json(err)
	}
}, async (req, res) => {
	let {
		body,
		query,
		params
	} = req
	let data = {
		body,
		query,
		params
	}
	sendMessage(
		process.env.POST_TOPIC,
		data,
		'GET-POSTS',
		async (error, data) => {
			console.log("#### POSTS fetching using kafka service")
			// await redisClient.set('allposts', JSON.stringify(data), {
			// 	EX: 3600
			// });
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

module.exports = router;