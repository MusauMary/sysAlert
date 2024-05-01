import dbConnect from '../../../utils/db';
import User from '../../../models/UserModel';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';


export async function POST(req, res) {
  await dbConnect();
  const { email, password } = await req.json();
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return NextResponse.json({ success: true, data: user } , { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
