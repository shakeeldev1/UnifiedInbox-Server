import { sendTextMessage } from "../channels/whatsapp/whatsapp.service.js";
import { findOrCreateContact } from "../contacts/contact.service.js";
import { findOrCreateConversation } from "../conversations/conversation.service.js";
import Message from "../../models/Message.js";

const sendMessage = async ({ channel, to, text }) => {
  let result;

  switch (channel) {
    case "whatsapp":
      result = await sendTextMessage({
        to,
        text,
      });
      break;

    case "instagram":
      throw new Error("Instagram messaging is not implemented yet");

    case "facebook":
      throw new Error("Facebook messaging is not implemented yet");

    default:
      throw new Error(`Unsupported channel: ${channel}`);
  }

  const externalMessageId = result?.messages?.[0]?.id;

  if (!externalMessageId) {
    throw new Error("Meta did not return a message ID");
  }

  const contact = await findOrCreateContact({
    channel,
    externalId: to.replace("+", ""),
    name: "Unknown",
    phone: channel === "whatsapp" ? to : null,
  });

  const conversation = await findOrCreateConversation({
    contactId: contact._id,
    channel,
    channelAccountId: process.env.WHATSAPP_ACCOUNT_ID,
  });

  const message = await Message.create({
    conversation: conversation._id,
    contact: contact._id,
    channel,
    externalMessageId,
    direction: "outgoing",
    type: "text",
    text,
    status: "sent",
    sender: {
      externalId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      name: "Business",
    },
    timestamp: new Date(),
    metadata: {
      providerResponse: result,
    },
  });

  conversation.lastMessage = text;
  conversation.lastMessageAt = message.timestamp;

  await conversation.save();

  return {
    messageId: message._id,
    externalMessageId,
    conversationId: conversation._id,
    contactId: contact._id,
    channel,
    to,
    text,
    status: message.status,
  };
};

export { sendMessage };