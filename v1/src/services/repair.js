// services/repairService.js
const RepairRepository = require('./Repositories/repairRepository');

class RepairService {
  constructor(repository) {
    this.repository = repository;
  }

  getAllRepairs() {
    return this.repository.getAll();
  }

  getRepairById(id) {
    return this.repository.getById(id);
  }

  createRepair(repairData) {
    return this.repository.create(repairData);
  }

  updateRepair(id, repairData) {
    return this.repository.update(id, repairData);
  }

  deleteRepair(id) {
    return this.repository.delete(id);
  }
}

module.exports = new RepairService(RepairRepository);
