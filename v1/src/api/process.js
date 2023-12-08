const express = require("express");
const ProcessController = require("../controllers/process");

const router = express.Router();

// Tüm işlemleri getir
router.get("/", ProcessController.getAllProcesses);

// Belirli bir işlemi getir
router.get("/:id", ProcessController.getProcessById);

// Yeni bir işlem oluştur
router.post("/", ProcessController.createProcess);

// Bir işlemi güncelle
router.put("/:id", ProcessController.updateProcess);

// Bir işlemi sil
router.delete("/:id", ProcessController.deleteProcess);

router.get("/device/:deviceID", ProcessController.getProcessesWithDetailsByDeviceID);

module.exports = router;
