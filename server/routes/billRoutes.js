const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBill,
  getBills,
  updateBill,
  deleteBill,
} = require("../controllers/billController");

router.post("/",protect, createBill);
router.get("/", protect,getBills);
router.put("/:id",protect, updateBill);
router.delete("/:id",protect, deleteBill);

module.exports = router;