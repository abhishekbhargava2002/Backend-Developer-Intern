const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userManagement.controller");

router.post("/", authenticate, authorize("Admin"), createUser);
router.get("/", authenticate, authorize("Admin"), getUsers);
router.get("/:id", authenticate, authorize("Admin"), getUserById);
router.patch("/:id", authenticate, authorize("Admin"), updateUser);
router.patch("/:id/status", authenticate, authorize("Admin"), deleteUser);

module.exports = router;
