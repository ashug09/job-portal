import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_URI);

const candidateSchema = new Schema({
  name: String,
  aboutYou: String,
  address: String,
  contact: Number,
  qualification: [String],
  skills: [String], //your skills
  jobType: [String], //prefered job type
  profilePicture: String,
  resume: String,
  email: String,
  appliedJobs: [String],
});
const Candidate =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
export default Candidate;
