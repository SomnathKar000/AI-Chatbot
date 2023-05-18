const User = require("../model/userModel");
const customError = require("../error/custom-error");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    throw new customError("Email already exists", 400);
  }
  if (name.trim().length < 4) {
    throw new customError("Invalid username", 400);
  }
  if (!emailValidator.validate(email)) {
    throw new customError("Invalid email", 400);
  }
  if (password.length < 5) {
    throw new customError("Invalid password", 400);
  }
  const salt = bcrypt.genSaltSync(10);
  const securePassword = bcrypt.hashSync(password, salt);
  user = await User.create({
    name,
    email,
    password: securePassword,
  });
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.status(200).json({ success: true, msg: "Signed-up succesfully", token });
};
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!emailValidator.validate(email)) {
    throw new customError("Invalid email", 400);
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new customError("User does not exist", 404);
  }

  let compare = bcrypt.compareSync(password, user.password);

  if (!compare) {
    throw new customError("Invalid credentials", 400);
  }

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.status(200).json({ success: true, msg: "Logged-in  succesfully", token });
};
const GetUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -__v -_id");
  if (!user) {
    throw new customError("User does not exist", 404);
  }
  res.status(200).json({ success: true, msg: "Get User succesfully", user });
};

module.exports = { SignUpUser, LoginUser, GetUser };
