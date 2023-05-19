const customError = require("../error/custom-error");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) {
    throw new customError("Token does not exist", 404);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    throw new customError(err.message, 400);
  }
};

const socketIoMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication token not provided"));
  }

  try {
    // Verify and decode the token to extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    // Attach the user ID to the socket object for further use
    socket.userId = userId;

    next();
  } catch (error) {
    return next(new Error("Invalid or expired token"));
  }
};

module.exports = { authentication, socketIoMiddleware };
