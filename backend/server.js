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
const socketController = require("./controllers/socket-io");

const app = express();

const server = http.createServer(app);

const io = socket_io(server, {
  cors: {
    origin: "*",
  },
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(express.static(path.resolve(path.dirname(__dirname), "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(path.dirname(__dirname), "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.use(express.json());
app.use(cors());

// Initialize session middleware

app.use("/api/v1/user", userRoute);

socketController(io);

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
