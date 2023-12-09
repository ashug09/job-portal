// this is the route for the candidatesApplied api that is shown to the employer in the candidatesApplied section
import Candidate from "../../models/Candidate";
import Employer from "../../models/Employer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const candidates = await Candidate.find({
      email: body.email,
    });
    if (candidates.length > 0) {
      return NextResponse.json(
        { message: "Candidates fetched successfully", candidates: candidates },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No candidates found" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "error: no candidates found" },
      { status: 500 }
    );
  }
}
