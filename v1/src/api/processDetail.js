const express = require("express");
const router = express.Router();
const ProcessDetailController = require("../controllers/processDetail");

// Tüm işlem detaylarını getir
router.get("/", ProcessDetailController.getAllProcessDetails);

// Belirli bir işlem detayını getir
router.get("/:id", ProcessDetailController.getProcessDetailById);

// Yeni bir işlem detayı oluştur
router.post("/", ProcessDetailController.createProcessDetail);

// Bir işlem detayını güncelle
router.put("/:id", ProcessDetailController.updateProcessDetail);

// Bir işlem detayını sil
router.delete("/:id", ProcessDetailController.deleteProcessDetail);

module.exports = router;
