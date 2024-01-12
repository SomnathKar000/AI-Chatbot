const { Router } = require("express");
const {
  getAiResponse,
  getAllmessages,
} = require("../controllers/message-controller");

const router = Router();

router.route("/").get(getAllmessages);
router.route("/ai").post(getAiResponse);

module.exports = router;
