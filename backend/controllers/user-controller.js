const SignUpUser = (req, res) => {
  res.status(200).json({ success: true, msg: "Signed-up succesfully" });
};
const LoginUser = (req, res) => {
  res.status(200).json({ success: true, msg: "Logged-in  succesfully" });
};
const GetUser = (req, res) => {
  res.status(200).json({ success: true, msg: "Get User succesfully" });
};

module.exports = { SignUpUser, LoginUser, GetUser };
