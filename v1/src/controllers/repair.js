// controllers/repairController.js
const RepairService = require('../services/repair');

class RepairController {
  constructor(service) {
    this.service = service;
  }

  async getAllRepairs(req, res) {
    const repairs = await this.service.getAllRepairs();
    res.json(repairs);
  }

  async getRepairById(req, res) {
    const { id } = req.params;
    const repair = await this.service.getRepairById(id);
    res.json(repair);
  }

  async createRepair(req, res) {
    const repairData = req.body;
    const newRepair = await this.service.createRepair(repairData);
    res.json(newRepair);
  }

  async updateRepair(req, res) {
    const { id } = req.params;
    const repairData = req.body;
    const updatedRepair = await this.service.updateRepair(id, repairData);
    res.json(updatedRepair);
  }

  async deleteRepair(req, res) {
    const { id } = req.params;
    await this.service.deleteRepair(id);
    res.json({ message: 'Repair deleted successfully' });
  }
}

module.exports = new RepairController(RepairService);
