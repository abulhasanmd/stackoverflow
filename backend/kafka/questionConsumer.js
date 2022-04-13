const { kafka } = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'backend-question-consumers' });
const questionService = require('../services/questionService');
const { sendMessage } = require('./producer');

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.QUESTION_TOPIC,
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
      case 'POST-QUESTION':
        response = await questionService.postQuestion(messageJSON);
        break;
      case 'UPDATE-QUESTION':
        response = await questionService.updateQuestion(messageJSON);
        break;
      case 'GET-ALLQUESTION':
          response = await questionService.getAllQuestions(messageJSON);
          break;
      case 'ADD-BOOKMARK':
        response = await questionService.addBookmark(messageJSON);
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
