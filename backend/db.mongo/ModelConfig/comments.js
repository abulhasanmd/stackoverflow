import mongoose from "mongoose";
const { model, Schema } = mongoose;

const commentSchema = new Schema({
    _id: { type: String},
    createdBy: {type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    resourceType: {type: String, enum: ["ques", "ans"]},
    resourceId: {type: String, required: true},
    comment: {type: String, maxLength: 500}
});

export default model("comments", commentSchema);

