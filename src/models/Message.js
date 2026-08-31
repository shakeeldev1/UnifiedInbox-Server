import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
      index: true,
    },

    channel: {
      type: String,
      enum: ["whatsapp", "instagram", "facebook"],
      required: true,
      index: true,
    },

    externalMessageId: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },

    direction: {
      type: String,
      enum: ["incoming", "outgoing"],
      required: true,
    },

    type: {
      type: String,
      enum: [
        "text",
        "image",
        "video",
        "audio",
        "document",
        "sticker",
        "location",
        "contact",
        "unknown",
      ],
      default: "text",
    },

    text: {
      type: String,
      default: null,
    },

    media: {
      url: {
        type: String,
        default: null,
      },

      mimeType: {
        type: String,
        default: null,
      },

      filename: {
        type: String,
        default: null,
      },
    },

    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "read", "failed"],
      default: "pending",
    },

    sender: {
      externalId: {
        type: String,
        default: null,
      },

      name: {
        type: String,
        default: null,
      },
    },

    timestamp: {
      type: Date,
      required: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  conversation: 1,
  timestamp: -1,
});

messageSchema.index({
  channel: 1,
  externalMessageId: 1,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;