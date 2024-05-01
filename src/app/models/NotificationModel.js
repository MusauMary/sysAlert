import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Notification = mongoose.model("Notification", notificationSchema);

mongoose.models = {}; // prevents rewriting of mongoose model
module.exports = Notification;
