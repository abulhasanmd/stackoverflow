import { getNewConnection } from './kafka/Connection.js'
import  path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import initMongoDB from '../backend/db.mongo/index.js';
import { readFileSync } from 'fs';


const directoryPath = path.join(__dirname, '/services');
var connection;

function handleTopicRequest(topic_name,func){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    // console.log('server is running ');
    consumer.on('message', function (message) {
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log('message received for ' + topic_name, data.correlationId);
        func(data.data, function(err, res){
            console.log('######### after handle', data.replyTo, data.correlationId);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            // console.log("########", payloads)
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

async function initKafkaConsumers() {
    const config = JSON.parse(readFileSync(new URL('../backend/config.json', import.meta.url)));
    global.config = config
    await initMongoDB()
    connection = getNewConnection()
    let files = fs.readdirSync(directoryPath)
    console.log("#### initKafkaConsumers :", files)
    return new Promise((resolve, reject) => {
        files.forEach(async function (file) {
            let servicesInfo = await import(`${__dirname}/services/${file}`)
            console.log('####### Loding kafka consumers :', `${__dirname}/services/${file}`)
            Object.keys(servicesInfo).forEach((method) => {
                try{
                    handleTopicRequest(method, servicesInfo[method])
                } catch(err) {
                    console.log("err in loding consumer :", err)
                }
            })
            // resolve()
        });
    })
}

process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection : ", err);
})
process.on('uncaughtException', (err) => {
    console.log("uncaughtException : ", err);
})

initKafkaConsumers()