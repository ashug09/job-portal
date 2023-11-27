import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_URI);

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
  // role: String,
  // profilePic: String,
  // contact: Number,
  // address: String,
  // skills: [String],
  // type: [String],
  // postDate: Date,
});

// const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
