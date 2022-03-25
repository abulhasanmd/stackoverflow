import mongoose from "mongoose";
import models from './ModelFactory/index.js'
import dotenv from 'dotenv';
dotenv.config()

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    maxPoolSize: 30, //By default it is 5 
    autoIndex: true
};

async function initMongoDB() {
    global.ModelFactory = models
    mongoose.connect(process.env.mongoDB, options, (err)=>{
      if(!err){
        console.log("Connected to mongodb");
      }else{
        console.log(err);
      }
    });

}

export default initMongoDB

