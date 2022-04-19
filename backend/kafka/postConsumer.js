const { kafka } = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'backend-post-consumers' });
const postService = require('../services/postService');
const { sendMessage } = require('./producer');

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.POST_TOPIC,
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
    const data = JSON.parse(message.value.toString());
    console.log(
      `received message with action:${action} id: ${id} parition: ${partition} and message:${JSON.stringify(data)}`,
    );
    let response;
    switch (action) {
      case 'GET-POSTS':
          response = await postService.getAllPosts(data);
          break;
      default:
        break;
    }
    sendMessage({ data: response }, id, partition);
  } catch (error) {
    console.error(error);
    sendMessage(
      {
        error: { message: error.message || 'Some error occured during processing questions request' },
      },
      id,
      partition,
    );
  }
};
