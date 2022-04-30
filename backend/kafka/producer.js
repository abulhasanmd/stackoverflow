const { kafka } = require('./kafkaClient');

const producer = kafka.producer();

(async () => { await producer.connect(); })();

const sendMessage = async (message, id, partition) => {
  try {
    console.log(`message to be sent is${JSON.stringify(message)}`);
    console.log('parition is', partition);
    await producer.send({
      topic: process.env.RESPONSE_TOPIC,
      messages: [
        {
          value: JSON.stringify(message),
          headers: {
            id,
          },
          partition,
        },
      ],
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { sendMessage };
