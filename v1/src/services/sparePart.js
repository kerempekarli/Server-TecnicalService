// services/SparePartService.js
const BaseRepository = require("./repositories/BaseRepository");
const { SparePart } = require("../models");

class SparePartService extends BaseRepository {
  constructor() {
    super(SparePart);
  }

  async updateSparePartQuantity(stockID, quantityChange) {
    const sparePart = await this.getById(stockID);

    if (!sparePart) {
      throw new Error(`SparePart with stockID ${stockID} not found`);
    }

    const newQuantity = sparePart.quantity + quantityChange;

    if (newQuantity < 0) {
      throw new Error(
        `Insufficient quantity for SparePart with stockID ${stockID}`
      );
    }

    return this.update(stockID, { quantity: newQuantity });
  }

  async getAllSpareParts() {
    return this.getAll();
  }

  async getSparePartById(stockID) {
    return this.getById(stockID);
  }

  async createSparePart(data) {
    return this.create(data);
  }

  async updateSparePart(stockID, data) {
    return this.update(stockID, data);
  }

  async deleteSparePart(stockID) {
    return this.delete(stockID);
  }
}

module.exports = new SparePartService();
