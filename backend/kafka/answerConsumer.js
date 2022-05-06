const { kafka } = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'backend-answer-consumers' });
const answerService = require('../services/answerService');
const { sendMessage } = require('./producer');

(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.ANSWER_TOPIC,
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
      case 'POST-ANSWER':
        response = await answerService.addAnswer(messageJSON);
        break;
      case 'GET-ANSWER-BY-QUESTIONID':
        response = await answerService.getAnswersByQuestionId(messageJSON);
        break;
      case 'UPDATE-ANSWER':
        response = await answerService.updateAnswer(messageJSON);
        break;
      case 'BEST-ANSWER':
        response = await answerService.bestAnswer(messageJSON);
      default:
        break;
    }
    sendMessage({ data: response }, id, partition);
  } catch (error) {
    console.error(error);
    sendMessage(
      {
        error: { message: error.message || 'Some error occured during processing answer request' },
      },
      id,
      partition,
    );
  }
};
