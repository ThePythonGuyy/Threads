import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
  ]
},{
  strict: true, // or any other default option you need
  strictPopulate: false,
  typeKey: 'type',
  id: true,
  _id: true,
  timestamps: true,
  versionKey: false,
});

const Community = mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
