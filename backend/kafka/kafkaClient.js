const { Kafka } = require('kafkajs');

// Initialize Kafka Client
const kafka = new Kafka({
  clientId: 'middleware-system',
  brokers: [process.env.BROKER_HOST],
});

module.exports = { kafka };
