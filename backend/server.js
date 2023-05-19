require("dotenv").config();
require("express-async-errors");
const express = require("express");
const http = require("http");
const socket_io = require("socket.io");
const cors = require("cors");
const userRoute = require("./routes/user-route");
const errorHandler = require("./middleware/error-handler");
const notFoundHandler = require("./middleware/not-found");
const connectDb = require("./db/connect");
const { socketIoMiddleware } = require("./middleware/authentication");
const { Configuration, OpenAIApi } = require("openai");

const app = express();

const server = http.createServer(app);
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(config);

const io = socket_io(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRoute);
app.get("/api/v1/ai", async (req, res) => {
  const question = req.body.question;
  const responce = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  console.log(responce.data.choices);
  res.status(200).json({ success: true, data: responce.data.choices });
});

io.use(socketIoMiddleware);

io.on("connection", (socket) => {
  console.log("Socket is active to be connected");
  const userId = socket.userId;
  console.log(userId);
  socket.on("chatBot", (data) => {
    console.log("the data is :", data);
    io.emit("chatBot", data);
  });
});

app.use(errorHandler);
app.use(notFoundHandler);

// Start the server
const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    console.log("Connected to the database");
    server.listen(5000, () => console.log("Server is listening on 5000"));
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};
start();
