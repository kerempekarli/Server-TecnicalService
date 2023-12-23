const { ProcessDetail } = require("../models");
const SparePartService = require("./sparePart");
const BaseRepository = require("./Repositories/baseRepository")

class ProcessDetailService extends BaseRepository {
  constructor() {
    super(ProcessDetail);
    this.sparePartService = SparePartService;
  }

  async createProcessDetail(data) {
    console.log("newProcessDetail", data);
    const newProcessDetail = await this.create(data);

    await this.sparePartService.updateSparePartQuantity(
      data.stockID,
      -data.usedQuantity
    );

    return newProcessDetail;
  }

  async updateProcessDetail(id, data) {
    // updateProcessDetailById metodunu çağırarak kod tekrarını önleyelim
    return this.updateProcessDetailById(id, data);
  }

  async deleteProcessDetail(id) {
    // deleteProcessDetailById metodunu çağırarak kod tekrarını önleyelim
    return this.deleteProcessDetailById(id);
  }

  // Eklenen CRUD metodları
  async getAllProcessDetails() {
    return this.getAll();
  }

  async getProcessDetailById(id) {
    return this.getById(id);
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
