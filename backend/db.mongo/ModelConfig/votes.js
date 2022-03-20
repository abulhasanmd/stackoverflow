import mongoose from "mongoose";
const { model, Schema } = mongoose;

const voteSchema = new Schema({
    _id: { type: string},
    createdBy: {type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    resourceType: {type: string, enum: ["ques", "ans"]},
    resourceId: {type: String, required: true},
    vote: {type: String, enum: [1, -1]}
  });

export default model("votes", voteSchema);





  