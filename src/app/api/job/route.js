import Job from "../../models/Job";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    Job.create(body);
    return NextResponse.json(
      { message: "Job created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const jobs = await Job.find({});
    return NextResponse.json(
      { message: "Jobs fetched successfully", jobs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
