const express = require('express');
const s3 = require('../utils/s3');

const router = express.Router();

router.get('/get-signed-url', async (req, res, next) => {
	const url = await s3.generateSignedUrl();
	res.json({
		data: url,
	});
});

module.exports = router;