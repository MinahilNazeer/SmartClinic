const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

router.post("/",protect, createDoctor);
router.get("/",protect, getDoctors);
router.put("/:id",protect, updateDoctor);
router.delete("/:id",protect, deleteDoctor);

module.exports = router;