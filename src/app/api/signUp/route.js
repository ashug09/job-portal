"use server";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";
import bcrypt from "bcrypt";
import { MongoServerError } from "mongodb";
// export async function POST(req, res) {
//   try {
//     const body = await req.json();
//     bcrypt.hash(body.password, 10, function (err, hash) {
//       if (!err) {
//         User.create({
//           name: body.name,
//           email: body.email,
//           password: hash,
//         });
//       } else {
//         console.log(err);
//       }
//     });

//     const jwtSecretKey = process.env.JWT_SECRET_KEY;
//     const data = {
//       user_email: body.email,
//       date: new Date(),
//     };
//     const token = jwt.sign(data, jwtSecretKey);
//     setCookie("token", token);
//     return NextResponse.json(
//       { message: "User created successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
export async function POST(req, res) {
  try {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      User.create(body);
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
