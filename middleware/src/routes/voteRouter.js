const express = require('express');
const {
	sendMessage
} = require('../kafka/producer');

const router = express.Router();


module.exports = router;