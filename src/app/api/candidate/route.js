import Candidate from "../../models/Candidate";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const candidate = await Candidate.find({ email: body.email });
    if (candidate.length > 0) {
      return NextResponse.json(
        { message: "Candidate already exists", candidate: candidate },
        { status: 200 }
      );
    } else {
      Candidate.create(body);
      return NextResponse.json(
        { message: "Candidate created successfully" },
        { status: 201 },
        { body }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Candidate not created" },
      { status: 500 },
      { error }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const duplicateId = await Candidate.find({
      email: body.email,
      appliedJobs: body.jobId,
    });
    if (duplicateId.length > 0) {
      return NextResponse.json(
        { message: "Already Apllied" },
        { status: 500 },
        { error }
      );
    } else {
      const candidate = await Candidate.findOneAndUpdate(
        { email: body.email },
        { $push: { appliedJobs: body.jobId } },
        { new: true }
      );
      if (candidate) {
        return NextResponse.json(
          { message: "Candidate updated successfully", status: 201 },
          { status: 201 },
          { candidate }
        );
      } else {
        return NextResponse.json(
          { message: "Candidate not updated", status: 500 },
          { error: error.message },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Candidate not updated, Job Already Applied", status: 500 },
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const candidates = await Candidate.find({});
    return NextResponse.json(
      { message: "Candidate fetched successfully", candidates },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
