const customError = require("../error/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res
      .status(err.ststusCode)
      .json({ success: false, msg: err.message });
  }
  return res
    .status(500)
    .json({ success: false, msg: "Internal server error..." });
};

module.exports = errorHandler;
