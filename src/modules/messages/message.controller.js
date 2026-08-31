import { sendMessage } from "./message.service.js";

const sendMessageController = async (req, res, next) => {
  try {
    const { channel, to, text } = req.body;

    if (!channel || !to || !text) {
      return res.status(400).json({
        success: false,
        message: "Channel, recipient and message text are required",
      });
    }

    const result = await sendMessage({
      channel,
      to,
      text,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { sendMessageController };