import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/database/dbconnect";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "Invalid email or password!" },
        { status: 400 }
      );

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return NextResponse.json(
        { error: "Invalid email or password!" },
        { status: 400 }
      );

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json(
      { message: `Welcome back ${user.username}!`, success: true },
      { status: 200 }
    );

    res.cookies.set("token", token, { httpOnly: true });
    console.log(res);
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
