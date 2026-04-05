const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

const {
  createFinancial,
  getFinancials,
  getFinancialById,
  updateFinancial,
  deleteFinancial,
} = require("../controllers/userRecord.controller");

router.post("/", authenticate, authorize("Admin"), createFinancial);

//View Admin, Viewer, Analyst
router.get(
  "/",
  authenticate,
  authorize("Admin", "Viewer", "Analyst"),
  getFinancials,
);
router.get("/:id", authenticate, authorize("Admin"), getFinancialById);
router.patch("/:id", authenticate, authorize("Admin"), updateFinancial);
router.delete("/:id", authenticate, authorize("Admin"), deleteFinancial);

module.exports = router;
