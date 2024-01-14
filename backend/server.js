require("dotenv").config();
require("express-async-errors");
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRoute = require("./routes/user-route");
const messageRote = require("./routes/message-route");
const { authentication } = require("./middleware/authentication");
const errorHandler = require("./middleware/error-handler");
const notFoundHandler = require("./middleware/not-found");
const connectDb = require("./db/connect");

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Initialize session middleware

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", authentication, messageRote);

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
