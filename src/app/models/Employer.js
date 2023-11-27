import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_URI);

const employerSchema = new Schema({
  companyName: String,
  companyDescription: String,
  companyAddress: String,
  recruterName: String,
  designation: String,
  contact: Number,
  companyLogo: String,
  email: String,
});

const Employer =
  mongoose.models.Employer || mongoose.model("Employer", employerSchema);
export default Employer;
