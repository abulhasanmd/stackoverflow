const express = require('express');
const {
	sendMessage,
} = require('../kafka/producer');

const router = express.Router();

router.get('/getMessages', (req,res) => {
    console.log("inside get Messages router")
    sendMessage(
        process.env.MESSAGE_TOPIC,
        req.query,
        'GET-MESSAGES',
        (error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
    )

})

router.post('/putMessages', (req, res) => {

    console.log("inside put messages router")
    
    sendMessage(
        process.env.MESSAGE_TOPIC,
        req.body,
        'POST-MESSAGES',
        (error, data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json(error);
			}
		}
    )

})

module.exports = router;



