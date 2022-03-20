import mongoose from "mongoose";
const { model, Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  descr: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'tags',
  }],
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  reviewStatus: {
    type: String,
    required: true,
  },
  imageUrls: [
    { type: String },
  ],
});

export default model("questions", questionSchema);

