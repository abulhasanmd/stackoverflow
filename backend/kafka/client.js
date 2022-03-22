import KafkaRPC from './kafkarpc.js'

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  var rpc = new KafkaRPC()
  console.log("in make request");
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      console.log("response", response);
      callback(null, response);
    }
  });
}



export default {make_request}
