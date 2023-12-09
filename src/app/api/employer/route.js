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

// export async function PUT(req) {
//   try {
//     const body = await req.json();
//     const employer = await Employer.findOneAndUpdate(
//       { email: body.empEmail },
//       { $push: { candidatesApplied: body.candidateEmail } },
//       { new: true }
//     );
//     if (employer) {
//       return NextResponse.json(
//         { message: "Employer updated successfully", status: 201 },
//         { status: 201 },
//         { employer }
//       );
//     } else {
//       return NextResponse.json(
//         { message: "Employer not updated", status: 500 },
//         { error: error.message },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Employer not updated", status: 500 },
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }
