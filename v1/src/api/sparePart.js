const express = require("express");
const router = express.Router();
const SparePartController = require("../controllers/sparePart");

// Tüm yedek parçaları getir
router.get("/", SparePartController.getAllSpareParts);

// Belirli bir yedek parçayı getir
router.get("/:stockID", SparePartController.getSparePartById);

// Yeni bir yedek parça oluştur
router.post("/", SparePartController.createSparePart);

// Bir yedek parçayı güncelle
router.put("/:stockID", SparePartController.updateSparePart);

// Bir yedek parçayı sil
router.delete("/:stockID", SparePartController.deleteSparePart);

module.exports = router;
