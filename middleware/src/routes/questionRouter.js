const express = require('express');

const router = express.Router();

router.post('/post-question', async (req, res) => {
	// const response = await questionService.postQuestion(req.body);
	// if (response.data) {
	// 	res.status(200).json(response);
	// } else {
	// 	res.status(400).json(response);
	// }
});

module.exports = router;