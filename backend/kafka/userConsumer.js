const {
	kafka,
} = require('./kafkaClient');

const consumer = kafka.consumer({
	groupId: 'backend-user-consumers',
});
const userService = require('../services/userService');
const {
	sendMessage,
} = require('./producer');

(async () => {
	await consumer.connect();
	await consumer.subscribe({
		topic: process.env.USER_TOPIC,
	});
	await consumer.run({
		eachMessage: async ({
			topic,
			partition,
			message,
		}) => {
			actionHandler(message);
		},
	});
})();

const actionHandler = async (message) => {
	const action = message.headers.action.toString();
	const id = message.headers.id.toString();
	const partition = message.headers.partition.toString();
	try {
		const messageJSON = JSON.parse(message.value.toString());
		console.log(
			`received message with action:${action} id: ${id} parition: ${partition} and message:${JSON.stringify(messageJSON)}`,
		);
		let response;
		switch (action) {
		case 'GET-TAGS-USED-IN-QUESTIONS':
			response = await userService.getTagsUsedInQuestions(messageJSON.userId);
			// response = await userService.postQuestion(messageJSON);
			break;
		case 'GET-BOOKMARKS':
			response = await userService.getBookmarks(messageJSON.userId);
			break;
		case 'GET-REPUTATION-ACTIVITY':
			response = await userService.getReputationActivity(messageJSON.userId);
			break;
		case 'GET-ALL-USERS':
			response = await userService.getAllUsers(messageJSON);
			break;
		default:
			break;
		}
		sendMessage({
			data: response,
		}, id, partition);
	} catch (error) {
		console.error(error);
		sendMessage({
				error: {
					message: error.message || 'Some error occured during processing USER request',
				},
			},
			id,
			partition,
		);
	}
};