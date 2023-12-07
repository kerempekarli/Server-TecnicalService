// services/SparePartService.js
const BaseRepository = require("./repositories/baseRepository");
const { SparePart } = require("../models");

class SparePartService extends BaseRepository {
  constructor() {
    super(SparePart);
  }

  async updateSparePartQuantity(stockID, quantityChange) {
    try {
      console.log("SPARE PART DATAS ", {
        stockID,
        quantityChange,
      });

      const sparePart = await this.getById(stockID);

      console.log("BULUNAN PARÇA", sparePart);

      const newQuantity = sparePart.quantity + quantityChange;

      console.log("new quantity ", newQuantity);

      // Burada yapılan değişiklik: update metodunun dönüş değerini alıyoruz
      const updatedRows = await this.update(
        { stockID: stockID },
        { quantity: newQuantity }
      );

      console.log("Updated Rows: ", updatedRows);

      // Güncelleme işlemi başarılıysa, güncellenmiş veriyi geri dönmek yerine yeniden sorgu yaparak veriyi getirelim
      if (updatedRows > 0) {
        const updatedSparePart = await this.getById(stockID);
        console.log("Updated Spare Part: ", updatedSparePart);
        return updatedSparePart;
      } else {
        throw new Error(`Failed to update SparePart with stockID ${stockID}`);
      }
    } catch (error) {
      console.error("Error updating spare part quantity:", error);
      throw error;
    }
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
