import mongoose from "mongoose";
const { model, Schema } = mongoose;

const answerSchema = new Schema({
    _id: { type: String},
    questionId: {type: String, required: true},
    createdBy: {type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    ans: {type: String, required: true} 
});

export default model("answers", answerSchema);

