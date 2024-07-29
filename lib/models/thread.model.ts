import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
},{
  strict: true, // or any other default option you need
  strictPopulate: false,
  typeKey: 'type',
  id: true,
  _id: true,
  timestamps: true,
  versionKey: false,
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
