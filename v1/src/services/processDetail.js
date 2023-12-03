// services/ProcessDetailService.js
const BaseRepository = require("./repositories/baseRepository");
const { ProcessDetail } = require("../models");
const SparePartService = require("./sparePart");

class ProcessDetailService extends BaseRepository {
  constructor() {
    super(ProcessDetail);
    this.sparePartService = SparePartService;
  }

  async createProcessDetail(data) {
    const newProcessDetail = await this.create(data);

    if (data.stockID) {
      await this.sparePartService.updateSparePartQuantity(
        data.stockID,
        -data.usedQuantity
      );
    }

    return newProcessDetail;
  }

  async updateProcessDetail(id, data) {
    const [numOfAffectedRows] = await this.update(id, data);

    if (numOfAffectedRows === 0) {
      throw new Error(`ProcessDetail with id ${id} not found`);
    }

    const updatedProcessDetail = await this.getById(id);

    return updatedProcessDetail;
  }

  async deleteProcessDetail(id) {
    const processDetail = await this.getById(id);

    if (!processDetail) {
      throw new Error(`ProcessDetail with id ${id} not found`);
    }

    if (processDetail.stockID) {
      await this.sparePartService.updateSparePartQuantity(
        processDetail.stockID,
        processDetail.usedQuantity
      );
    }

    await this.delete(id);

    return { message: "ProcessDetail deleted successfully" };
  }

  // Eklenen CRUD metodları
  async getAllProcessDetails() {
    return this.getAll();
  }

  async getProcessDetailById(id) {
    return this.getById(id);
  }

  async createProcessDetail(data) {
    return this.create(data);
  }

  async updateProcessDetailById(id, data) {
    const [numOfAffectedRows] = await this.update(id, data);

    if (numOfAffectedRows === 0) {
      throw new Error(`ProcessDetail with id ${id} not found`);
    }

    const updatedProcessDetail = await this.getById(id);

    return updatedProcessDetail;
  }

  async deleteProcessDetailById(id) {
    const processDetail = await this.getById(id);

    if (!processDetail) {
      throw new Error(`ProcessDetail with id ${id} not found`);
    }

    if (processDetail.stockID) {
      await this.sparePartService.updateSparePartQuantity(
        processDetail.stockID,
        processDetail.usedQuantity
      );
    }

    await this.delete(id);

    return { message: "ProcessDetail deleted successfully" };
  }
}

module.exports = new ProcessDetailService();
