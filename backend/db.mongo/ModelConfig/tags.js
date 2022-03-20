import mongoose from "mongoose";
const { model, Schema } = mongoose;

const tagSchema = new Schema({
    _id: { type: String},
    name: {type: String, maxLength: 10},
    descr: {type: String},
    createdBy: {type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});

export default model("tags", tagSchema);

