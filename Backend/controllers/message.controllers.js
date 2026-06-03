import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      channel: req.params.channel,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};