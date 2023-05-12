const {
  SignUpUser,
  LoginUser,
  GetUser,
} = require("../controllers/user-controller");
const express = require("express");
const router = express.Router();

router.route("/sign-up").post(SignUpUser);
router.route("/login").post(LoginUser);
router.route("/get-user").get(GetUser);

module.exports = router;
