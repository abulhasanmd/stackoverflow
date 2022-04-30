const uuid = require('uuid').v4;
const { kafka } = require('./kafkaClient');
const { addCallBacktoCallBackMap } = require('./consumer');

const producer = kafka.producer();

(async () => { await producer.connect(); })();

const sendMessage = async (topic, message, action, callback) => {
  try {
    const id = uuid();
    const partition = await addCallBacktoCallBackMap(id, callback);
    console.log(`pushing message:${JSON.stringify(message)} to topic:${topic} with id:${id} and partition: ${partition}`);
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
          headers: {
            id,
            action,
            partition
          },
        },
      ],
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { sendMessage };
