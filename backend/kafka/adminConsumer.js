const { kafka } = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'backend-admin-consumers' });
const adminService = require('../services/adminService');
const { sendMessage } = require('./producer');

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.ADMIN_TOPIC,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
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
    // console.log(
    //   `received message with action:${action} id: ${id} parition: ${partition} and message:${JSON.stringify(messageJSON)}`,
    // );
    let response;
    switch (action) {
      case 'GET-TAGS':
        response = await adminService.getTags();
        break;
      case 'ADD-TAG':
        response = await adminService.addTag(messageJSON);
        break;
      case 'GET-PENDING-QUESTIONS':
        response = await adminService.getPendingQuestions();
        break;
      case 'UPDATE-REVIEW-STATUS':
        response = await adminService.updateReviewStatus(messageJSON);
        break;
      case 'GET-ANALYTICS':
        response = await adminService.getAnalytics();
        break;
      default:
        break;
    }
    sendMessage({ data: response }, id, partition);
  } catch (error) {
    console.error(error);
    sendMessage(
      {
        error: { message: error.message || 'Some error occured during processing admin request' },
      },
      id,
      partition,
    );
  }
};
