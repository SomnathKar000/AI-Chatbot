const Chat = require("../model/messageModel");

const configureSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("Socket is active and connected");
    const userId = socket.userId;
    console.log(userId);
    const messages = await Chat.find(userId);
    // io.emit("socket", socket);
    socket.on("chatBot", (data) => {
      console.log("The data is:", data);
      io.emit("chatBot", data, messages);
    });
  });
};

module.exports = configureSocket;
