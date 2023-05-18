const {
  SignUpUser,
  LoginUser,
  GetUser,
} = require("../controllers/user-controller");
const authentication = require("../middleware/authentication");
const express = require("express");
const router = express.Router();

router.route("/sign-up").post(SignUpUser);
router.route("/login").post(LoginUser);
router.route("/get-user").get(authentication, GetUser);

module.exports = router;
