import express from 'express';
import cors from 'cors';
import {
    initRestApis
} from './Rest/index.js'
import {
    AuthTokenMiddleWare
} from './Middlewares/AuthTokenMiddleWare.js'
import kafka from './kafka/client.js';
import initMongoDB from './db.mongo/index.js'
import {
    readFileSync
} from 'fs';


const PORT = process.env.PORT || 3001
global.myrequests = {}
process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection : ", err);
})
process.on('uncaughtException', (err) => {
    console.log("uncaughtException : ", err);
})
var app = express({
    mergeParams: true
});
app.use(express.static('../Frontend/etsy/build'))
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
const config = JSON.parse(readFileSync(new URL('./config.json', import.meta.url)));
global.config = config
console.log("####", config)
global.ModelFactory = await initMongoDB()
global.kafka = kafka
await AuthTokenMiddleWare(app)
await initRestApis(app)
app.listen(PORT, function() {
    console.log("Server listening on port 3001");
});

export default app;