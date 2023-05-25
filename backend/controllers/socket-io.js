const Chat = require("../model/messageModel");
const getAnswers = require("./chat-gpt-controller");
const { socketIoMiddleware } = require("../middleware/authentication");

const configureSocket = (io) => {
  io.on("connection", async (socket) => {
    const sessionId = socket.handshake.sessionID;
    console.log("Connected with Session ID:", sessionId);
    socket.on("chatBot", async (data) => {
      try {
        const {
          message,
          auth: { token },
        } = data;
        const userId = socketIoMiddleware(token);
        if (!userId) {
          io.emit("error", "Authentication failed");
          return;
        }
        if (!message) {
          io.emit("error", "Message does not exist");
          return;
        }
        const userMessage = await Chat.create({
          userId,
          message: [data.message],
        });
        io.emit("userMessage", userMessage);

        const answer = await getAnswers(message);
        const userAnswer = await Chat.create({
          userId,
          message: answer,
          role: "assistant",
        });

        io.emit("userAnswer", userAnswer);
      } catch (error) {
        console.error("An error occurred:", error);
        io.emit("error", "An error occurred");
      }
    });

    socket.on("getMessages", async (data) => {
      try {
        const userId = socketIoMiddleware(data.auth.token);
        if (!userId) {
          io.emit("error", "Authentication failed");
          return;
        }
        const messages = await Chat.find({ userId }).select(" -__v -userId");
        io.emit("getMessages", messages);
      } catch (error) {
        console.error("An error occurred:", error);
        io.emit("error", "An error occurred");
      }
    });
  });
};

module.exports = configureSocket;
