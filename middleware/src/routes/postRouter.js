const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');
const redis = require('redis');

const router = express.Router();
let postService = require('../../../backend/services/postService.js');

const redisClient2 = redis.createClient({
	url: process.env.REDISURL,
});
await redisClient2.connect();

router.post('/get-posts', async (req, res, next) => {
	try {
		let data = await redisClient2.get('allposts');
		// console.log("##### redis data", data)
		if (data !== null && data) return res.status(200).json(JSON.parse(data));
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
			await redisClient2.set('allposts', JSON.stringify(data), {
				EX: 3600
			});
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
	);
});

router.post('/get-posts/BR', async (req, res, next) => {
	try {
		let data = await redisClient.get('allposts');
		if (data != "null" && data) {
			console.log("##### redis data")
			return res.status(200).json(JSON.parse(data));
		}
		next();
	} catch (err) {
		console.log("### err", err)
		return res.status(400).json(err)
	}
}, async (req, res) => {
	try {
		let {
			body,
			params,
			query
		} = req
		let data = {
			body,
			params,
			query
		};
		let result = await postService.getAllPosts(data);
		await redisClient.set('allposts', JSON.stringify(result), {
			EX: 3600
		});
		return res.json(result).status(200)
	} catch (err) {
		console.log("### err", err)
		return
	}
});

router.post('/get-posts/B', async (req, res, next) => {
	try {
		let {
			body,
			params,
			query
		} = req
		let data = {
			body,
			params,
			query
		};
		let result = await postService.getAllPosts(data);
		return res.json(result).status(200)
	} catch (err) {
		console.log("### err", err)
		return res.status(400).json(err)
	}
});

module.exports = router;