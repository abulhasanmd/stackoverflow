const db = require('../db/sql/SQL');

const getMessages = async (body) => {
	const {
		sender,
	} = body;
	const {
		receiver,
	} = body;
	const messageHistory = `SELECT * FROM messages WHERE (sender = "${sender}" or sender = "${receiver}") and (receiver="${receiver}" or receiver="${sender}") ORDER BY createdAt`;
	return new Promise((resolve) => {
		db.query(messageHistory, (err, result) => {
			if (err) {
				console.log('Unsuccessful in getting messages from the database');
				resolve({
					error: {
						message: 'Unsuccessful in getting messages from the database ',
					},
				});
				return;
			}

			console.log('successful in getting messages from the database');
			console.log(result);
			resolve(result);
		});
	});
};

const postMessage = async (body) => {
	console.log('inside put messages router');
	const sender = body.senderId;
	const receiver = body.receiverId;
	const message = body.messageText;

	const insert = `INSERT INTO messages (sender, receiver, messageText) VALUES ("${sender}", "${receiver}", "${message}")`;
	return new Promise((resolve) => {
		db.query(insert, (err, result) => {
			if (err) {
				console.log('Unsuccessful in inserting message into the database');
				console.log(err)
				resolve({
					error: {
						message: 'Unsuccessful in inserting message into the database',
					},
				});
			}

			console.log('successful in inserting message into database');
			resolve(
                {data:'successful'}
            );
		});
	});
};

module.exports = {
	getMessages,
	postMessage,
};