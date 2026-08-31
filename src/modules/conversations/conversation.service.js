import Conversation from "../../models/Conversation.js";

const findOrCreateConversation = async ({
  contactId,
  channel,
  channelAccountId,
}) => {
  let conversation = await Conversation.findOne({
    contact: contactId,
    channel,
    channelAccountId,
  });

  if (conversation) {
    return conversation;
  }

  conversation = await Conversation.create({
    contact: contactId,
    channel,
    channelAccountId,
  });

  return conversation;
};

export { findOrCreateConversation };