import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_URI);

mongoose.Promise = global.Promise;
const jobSchema = new Schema(
  {
    jobTitle: String,
    jobDescription: String,
    jobLocation: String,
    companyName: String,
    companyAddress: String,
    experience: String,
    salary: String,
    jobType: [String],
    skills: [String],
    email: String,
    companyLogo: String,
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
