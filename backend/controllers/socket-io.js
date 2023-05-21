const Chat = require("../model/messageModel");
const { socketIoMiddleware } = require("../middleware/authentication");

const configureSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("Socket is active and connected");
    socket.on("chatBot", async (data) => {
      console.log("The data is:", data);
      const userId = socketIoMiddleware(data.auth.token);
      if (!userId) {
        io.emit("error", "Authentication failed");
      }

      console.log(userId);
      io.emit("chatBot", data);
    });

    socket.on("getMessages", async (data) => {
      const userId = socketIoMiddleware(data.auth.token);
      if (!userId) {
        io.emit("error", "Authentication failed");
      }
      const messages = await Chat.find({ userId });
      io.emit("getMessages", messages);
    });
  });
};

module.exports = configureSocket;
