const { kafka } = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'backend-message-consumers' });
const messageService = require('../services/messageService');
const { sendMessage } = require('./producer');

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.MESSAGE_TOPIC,
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
    console.log(
      `received message with action:${action} id: ${id} parition: ${partition} and message:${JSON.stringify(messageJSON)}`,
    );
    let response;
    switch (action) {
      // TODO change action name and invoked service
      case 'GET-TAGS':
        // response = await adminService.getTags();
        break;
      default:
        break;
    }
    sendMessage({ data: response }, id, partition);
  } catch (error) {
    console.error(error);
    sendMessage(
      {
        error: { message: error.message || 'Some error occured during processing message request' },
      },
      id,
      partition,
    );
  }
};
