import Job from "../../models/Job";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const job = await Job.find({ jobTitle: body.name });
    return NextResponse.json({ message: "success", job: job });
  } catch (error) {
    return NextResponse.json({ message: "Error check it in console" });
  }
}
