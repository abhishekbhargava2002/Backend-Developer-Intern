const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

const {
  dashboardSummary,
  categoryTypeSummary,
} = require("../controllers/dashBoard.controller");

router.get(
  "/summary",
  authenticate,
  authorize("Admin", "Viewer", "Analyst"),
  dashboardSummary,
);

router.get(
  "/category-type",
  authenticate,
  authorize("Admin", "Viewer", "Analyst"),
  categoryTypeSummary,
);

module.exports = router;
