const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schem(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notifiaction = mongoose.model("Notification", notificationSchema);
module.exports = Notifiaction;
