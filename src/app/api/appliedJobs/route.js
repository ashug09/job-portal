//this is the route for the applied jobs api, that jobs which are applied by the candidates will be shown to the candidates in the applied jobs section
import Job from "../../models/Job";
import Candidate from "../../models/Candidate";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const jobs = await Job.find({
      _id: body.appliedJobs,
    });
    return NextResponse.json({ message: jobs }, { jobs });
  } catch (error) {
    return NextResponse.error(error);
  }
}
