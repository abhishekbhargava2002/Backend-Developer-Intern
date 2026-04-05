const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
} = require("../controllers/userAuth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
