import connectDB from "../../utils/db";
import Notification from "../../models/NotificationModel";
import { NextResponse } from "next/server";

export async function GET(err, req, res, next) {
  await connectDB();

  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: notifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}

export async function POST(req, res) {
  await connectDB();
  const { title, message, solution } = await req.json();

  try {
    const notification = await Notification.create({
      title,
      message,
      solution,
    });
    return NextResponse.json(
      { success: true, data: notification },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
