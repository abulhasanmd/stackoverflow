/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const { kafka } = require('./kafkaClient');

const consumer = kafka.consumer({ groupId: 'middleware-consumer' });
const idToCallBackMap = {};
let partition;
(async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.RESPONSE_TOPIC,
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      responseHandler(message);
    },
  });
})();

consumer.on(consumer.events.GROUP_JOIN,(event)=>{
  partition = ''+event.payload.memberAssignment.responses[0];
  console.log(`listening on partition: ${partition}`)
})

const addCallBacktoCallBackMap = async (id, callback) => {
  const tId = setTimeout(
    () => {
      callback('Request Timeout, Please try again!', null);
      delete idToCallBackMap.id;
    },
    10000,
    id,
  );
  idToCallBackMap[id] = { callback, tId };
  return partition;
};

const responseHandler = async (message) => {
  const id = message.headers.id.toString();
  try {
    const messageJSON = JSON.parse(message.value.toString());
    console.log('id from header is ', id);
    // console.log('maps is',idToCallBackMap);
    console.log('messagejson is', JSON.stringify(messageJSON));
    const entry = idToCallBackMap[id];
    if (entry) {
      if (messageJSON.data) {
        entry.callback(null, messageJSON.data);
      } else {
        entry.callback(messageJSON.error, null);
      }
      delete idToCallBackMap.id;
      clearTimeout(entry.tId);
    } else {
      console.error('response received after slo', messageJSON);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addCallBacktoCallBackMap };
