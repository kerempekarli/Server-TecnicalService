// api/repair.js
const express = require("express");
const router = express.Router();
const RepairController = require("../controllers/repair");

// GET all repairs
router.get("/", RepairController.getAllRepairs.bind(RepairController));

// GET repair by ID
router.get("/:id", RepairController.getRepairById.bind(RepairController));

// POST create new repair
router.post("/", RepairController.createRepair.bind(RepairController));

// PUT update repair by ID
router.put("/:id", RepairController.updateRepair.bind(RepairController));

// DELETE repair by ID
router.delete("/:id", RepairController.deleteRepair.bind(RepairController));

module.exports = router;
