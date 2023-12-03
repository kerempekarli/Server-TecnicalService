const SparePartService = require("../services/sparePart");

class SparePartController {
  async getAllSpareParts(req, res) {
    try {
      const spareParts = await SparePartService.getAllSpareParts();
      res.json(spareParts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSparePartById(req, res) {
    const { stockID } = req.params;
    try {
      const sparePart = await SparePartService.getSparePartById(stockID);
      if (!sparePart) {
        return res.status(404).json({ message: "SparePart not found" });
      }
      res.json(sparePart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createSparePart(req, res) {
    const sparePartData = req.body;
    try {
      const newSparePart = await SparePartService.createSparePart(
        sparePartData
      );
      res.json(newSparePart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSparePart(req, res) {
    const { stockID } = req.params;
    const sparePartData = req.body;
    try {
      const updatedSparePart = await SparePartService.updateSparePart(
        stockID,
        sparePartData
      );
      res.json(updatedSparePart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSparePart(req, res) {
    const { stockID } = req.params;
    try {
      const result = await SparePartService.deleteSparePart(stockID);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SparePartController();
