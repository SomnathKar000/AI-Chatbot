const Message = require("../model/messageModel");
const User = require("../model/userModel");
const CustomError = require("../error/custom-error");
const getAiAnswer = require("./chat-gpt-controller");

const getAllmessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    const messages = await Message.find({ userId }).select(" -__v -userId");
    res.status(200).json({
      success: true,
      msg: "Fetched all messages",
      messages,
    });
  } catch (error) {
    throw new CustomError("Unable to fetch all messages", 400);
  }
};

const getAiResponse = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }

    const question = req.body.question;
    if (!question) {
      throw new CustomError("Question cannot be empty", 400);
    }

    const { success, messageArray: answer } = await getAiAnswer(question);

    if (success) {
      await Message.create({
        userId,
        message: [question],
      });
      await Message.create({
        userId,
        message: answer,
        role: "assistant",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Fetched ai response",
      AIresponse: answer,
    });
  } catch (error) {
    console.log(error);
    throw new CustomError("Unable to fetch ai response", 400);
  }
};

module.exports = { getAllmessages, getAiResponse };
