const validateSendMessage = (req, res, next) => {
  const { channel, to, text } = req.body;

  if (!channel) {
    return res.status(400).json({
      success: false,
      message: "Channel is required",
    });
  }

  const supportedChannels = ["whatsapp", "instagram", "facebook"];

  if (!supportedChannels.includes(channel)) {
    return res.status(400).json({
      success: false,
      message: "Unsupported channel",
    });
  }

  if (!to) {
    return res.status(400).json({
      success: false,
      message: "Recipient is required",
    });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message text is required",
    });
  }

  next();
};

export { validateSendMessage };