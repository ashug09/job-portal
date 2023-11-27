import User from "../../models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const data = {
        user_email: body.email,
        date: new Date(),
      };
      const token = jwt.sign(data, jwtSecretKey);
      setCookie("token", token);
      return NextResponse.json(
        { message: "User found successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
