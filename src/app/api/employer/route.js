import Employer from "../../models/Employer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    Employer.create(body);
    return NextResponse.json(
      { message: "Employer created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const employer = await Employer.find({});

    return NextResponse.json(
      { message: "Employer fetched successfully", employer },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
