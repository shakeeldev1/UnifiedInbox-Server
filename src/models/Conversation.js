import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    channel: {
      type: String,
      enum: ["whatsapp", "instagram", "facebook"],
      required: true,
    },

    channelAccountId: {
      type: String,
      required: true,
    },

    lastMessage: {
      type: String,
      default: null,
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    unreadCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({
  contact: 1,
  channel: 1,
  channelAccountId: 1,
});

export default mongoose.model("Conversation", conversationSchema);