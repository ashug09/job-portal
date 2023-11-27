import Employer from "../../models/Employer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const EmployerProfile = await Employer.find({ email: body.email });
    if (EmployerProfile.length === 0) {
      return NextResponse.json(
        { message: "Employer not found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        message: "success",
        EmployerProfile: EmployerProfile,
      });
    }
  } catch (error) {
    return NextResponse.error({ status: 500, message: error.message });
  }
}
