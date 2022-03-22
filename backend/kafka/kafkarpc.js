import crypto from 'crypto'
import ConnectionProvider from './connection.js'

var TIMEOUT = 100000; //time to wait for response in ms
var self;


function KafkaRPC() {
  self = this;
  this.connection = ConnectionProvider;
  this.requests = {}; //hash to store request in wait for response
  this.response_queue = false; //placeholder for the future queue
  this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function (topic_name, content, callback) {
  self = this;
  //generate a unique correlation id for this call
  var correlationId = crypto.randomBytes(16).toString("hex");

  //create a timeout for what should happen if we don't get a response
  var tId = setTimeout(
    function (corr_id) {
      //if this ever gets called we didn't get a response in a
      //timely fashion
      console.log("timeout");
      callback(new Error("timeout " + corr_id));
      //delete the entry from hash
      delete myrequests[corr_id];
    },
    TIMEOUT,
    correlationId
  );

  //create a request entry to store in a hash
  var entry = {
    callback: callback,
    timeout: tId //the id for the timeout so we can clear it
  };

  //put the entry in the hash so we can match the response later
  myrequests[correlationId] = entry;

  //make sure we have a response topic
  self.setupResponseQueue(self.producer, topic_name, function () {
    console.log("in response");
    //put the request on a topic

    var payloads = [
      {
        topic: topic_name,
        messages: JSON.stringify({
          correlationId: correlationId,
          replyTo: "response_topic",
          data: content
        }),
        partition: 0
      }
    ];
    console.log("in response1");
    console.log(self.producer.ready);
    self.producer.send(payloads, function (err, data) {
      console.log("in response2");
      if (err) console.log(err);
      console.log(data);
    });
  });
};

KafkaRPC.prototype.setupResponseQueue = function (producer, topic_name, next) {
  //don't mess around if we have a queue
  if (this.response_queue) return next();

  console.log("1");

  self = this;

  //subscribe to messages
  var consumer = self.connection.getConsumer("response_topic");
  consumer.on("message", function (message) {
    var data = JSON.parse(message.value);
    //get the correlationId
    var correlationId = data.correlationId;
    console.log("###### response_topic consumed", correlationId);

    //is it a response to a pending request
    console.log("##### correlationId in myrequests", correlationId in myrequests)
    if (myrequests[correlationId]) {
      //retrieve the request entry
      var entry = myrequests[correlationId];
      //make sure we don't timeout by clearing it
      clearTimeout(entry.timeout);
      //delete the entry from hash
      delete myrequests[correlationId];
      //callback, no err
      entry.callback(data.error, data.data);
    }
  });
  self.response_queue = true;
  console.log("returning next");
  return next();
};

export default KafkaRPC;

