const express = require('express');
// const app = require('../app');
// const db = require('../db/sql/SQL')

const router = express.Router();

router.get('/getMessages', (req,res) => {

})

router.post('/putMessages', (req, res) => {

    console.log("inside put messages router")
    const sender = req.body.senderId
    const receiver = req.body.receiverId
    const message = req.body.messageText

    // var insert = `INSERT INTO messages (sender, receiver, messageText) VALUES ("${sender}", "${receiver}", "${message}")`
    // db.query(insert, (err, result) =>{
    //     if(err) {
    //         console.log('Unsuccessful in inserting message into the database')
    //         res.status(400).send('Unsuccessful')
    //         throw err
    //     }

    //     console.log('successful in inserting message into database')
    //     res.status(200).send('successful')
    // })
})

module.exports = router;



