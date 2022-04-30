const express = require('express');

const router = express.Router();

const userService = require('../services/userService');

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.get('/get-tags-used-in-questions/:userId', async (req, res, next) => {
	const response = await userService.getTagsUsedInQuestions(req.params.userId);
	if (response.data) {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
});

router.get('/get-bookmarks/:userId', async (req, res, next) => {
	const response = await userService.getBookmarks(req.params.userId);
	if (response.data) {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
});

router.get('/get-reputation-activity/:userId', async (req, res, next) => {
	const response = await userService.getReputationActivity(req.params.userId);
	if (response.data) {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
});

module.exports = router;