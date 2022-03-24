import mongoose from "mongoose";
const { model, Schema } = mongoose

const usersSchema = new Schema({
    _id: { type: String},
    name: { type: String, maxLength: 20 },
    emailId: { type: String, maxLength: 20 },
    role: {type: String, enum: ["admin", "user"]},
    password: { type: String, minLength: 8 },
    imageUrl: { type: String, maxLength: 100},
    location: { type: String, maxLength: 20 },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now },
    reputation: { type: Number, default: 0 },
    questionsAnswered: { type: Number, default: 0 },
    questionsAsked: { type: Number, default: 0 },
    lastSeen: { type: Date, default: Date.now },
    reach: { type: Number, default: 0 },
    about: { type: String, maxLength: 20 },
    badges:  {
    _id: {
      type: { type: String, default: 0 },
      name: { type: String, maxLength: 20 },
      createdBy: { type: String, maxLength: 20 },
      score: {type:Number,default:0},
      level: {type: String, maxLength: 10}
    }
  },
    bookmarks: {type: Array}
  }
  );

export default model("users", usersSchema);