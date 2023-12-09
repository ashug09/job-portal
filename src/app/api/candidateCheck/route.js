import Candidate from "../../models/Candidate";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const candidate = await Candidate.find({ email: body.email });
    if (candidate.length > 0) {
      return NextResponse.json(
        { message: "Candidate already exists", candidate: candidate },
        { status: 200 },
        { candidate }
      );
    } else {
      return NextResponse.json(
        { message: "Candidate not be found" },
        { status: 404 },
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
