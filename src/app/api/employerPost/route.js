import Job from "../../models/Job";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const jobs = await Job.find({ email: body.email });
    return NextResponse.json({ message: "success", jobs: jobs });
  } catch (error) {
    return NextResponse.error({ status: 500, message: error.message });
  }
}
