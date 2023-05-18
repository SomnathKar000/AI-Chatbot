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
module.exports = authentication;
