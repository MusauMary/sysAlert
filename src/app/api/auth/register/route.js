import dbConnect from "../../../utils/db";
import User from "../../../models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await dbConnect();
  const { name, email, password } = await req.json();

  console.log(name);
  try {
    const user = await User.create({ name, email, password });
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
