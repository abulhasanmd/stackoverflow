const { Kafka } = require('kafkajs');

// Initialize Kafka Client
const kafka = new Kafka({
  clientId: 'middleware-system',
  brokers: ['localhost:9092'],
});

module.exports = { kafka };
