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

const socketIoMiddleware = (token) => {
  if (!token) {
    return null;
  }
  try {
    // Verify and decode the token to extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    return userId;
  } catch (error) {
    return null;
  }
};

module.exports = { authentication, socketIoMiddleware };
