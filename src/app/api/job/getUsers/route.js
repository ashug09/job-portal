import Job from "../../../models/Job";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const body = await req.json();
      const users = await Job.find({ _id: body.jobId });
      return NextResponse.json(
        { message: "Users fetched successfully", users: users },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }