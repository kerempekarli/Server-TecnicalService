// services/ProcessService.js
const BaseRepository = require("./Repositories/baseRepository");
const { Process } = require("../models");
const ProcessDetailService = require("./processDetail");

class ProcessService extends BaseRepository {
  constructor() {
    super(Process);
    this.processDetailService = ProcessDetailService;
  }

  async createProcessWithDetails(processData, processDetailData) {
    const newProcess = await this.create(processData);

    processDetailData.processID = newProcess.processID;
    await this.processDetailService.createProcessDetail(processDetailData);

    return newProcess;
  }

  async updateProcess(id, data) {
    const [numOfAffectedRows] = await this.update(id, data);

    if (numOfAffectedRows === 0) {
      throw new Error(`Process with id ${id} not found`);
    }

    const updatedProcess = await this.getById(id);

    return updatedProcess;
  }

  async deleteProcess(id) {
    const processDetails = await this.processDetailService.getAll({
      where: { processID: id },
    });

    for (const processDetail of processDetails) {
      await this.processDetailService.deleteProcessDetail(
        processDetail.detailID
      );
    }

    await this.delete(id);

    return { message: "Process and associated details deleted successfully" };
  }

  // Eklenen CRUD metodları
  async getAllProcesses() {
    return this.getAll();
  }

  async getProcessById(id) {
    return this.getById(id);
  }

  async createProcess(data) {
    return this.create(data);
  }

  async updateProcess(id, data) {
    const [numOfAffectedRows] = await this.update(id, data);

    if (numOfAffectedRows === 0) {
      throw new Error(`Process with id ${id} not found`);
    }

    const updatedProcess = await this.getById(id);

    return updatedProcess;
  }

  async deleteProcessById(id) {
    const processDetails = await this.processDetailService.getAll({
      where: { processID: id },
    });

    for (const processDetail of processDetails) {
      await this.processDetailService.deleteProcessDetail(
        processDetail.detailID
      );
    }

    await this.delete(id);

    return { message: "Process and associated details deleted successfully" };
  }
}

module.exports = new ProcessService();