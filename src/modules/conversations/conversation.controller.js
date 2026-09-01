import Conversation from "../../models/Conversation.js";

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find()
      .populate("contact")
      .sort({ lastMessageAt: -1 });

    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};
