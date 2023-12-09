import Job from "../../models/Job";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(5);
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "error occured" + error.message });
  }
}
