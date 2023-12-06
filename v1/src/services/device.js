const BaseRepository = require("./repositories/baseRepository");
const Device = require("../models/device");

class DeviceService extends BaseRepository {
  constructor() {
    // Device modelini burada parametre olarak alın
    super(Device);
  }
  // Burada BaseRepository'den gelen metodları kullanabilir ve özelleştirebilirsiniz.
  // Ayrıca, DeviceService'ye özel metodları da ekleyebilirsiniz.

  // Örneğin, BaseRepository'den gelen create metodunu burada özelleştiriyoruz.
  async createDevice(deviceData) {
    // Özel işlemler eklenebilir
    console.log("Custom logic for creating a device");

    // BaseRepository'den gelen create metodunu kullanıyoruz.
    return this.create(deviceData);
  }

  async getDevicesByCustomerId(customerId) {
    try {
      // Örnek olarak, müşteri bilgilerini içeren bir sütunun adını varsayalım (customer).
      const devices = await this.model.find({
        "customer.CustomerId": customerId,
      });

      return devices;
    } catch (error) {
      throw error;
    }
  }

  async getDevicesByEmployeeId(customerId) {
    try {
      // Örnek olarak, müşteri bilgilerini içeren bir sütunun adını varsayalım (customer).
      const devices = await this.model.find({
        "device.EmployeeId": customerId,
      });

      return devices;
    } catch (error) {
      throw error;
    }
  }

  async updateDeviceStatus(deviceId, status) {
    try {
      const device = await this.getById(deviceId);

      if (!device) {
        throw new Error("Device not found");
      }

      // Status güncelleme işlemi
      device.status = status;
      await device.save();

      return device;
    } catch (error) {
      throw error;
    }
  }

  // Diğer özel metodları buraya ekleyebilirsiniz.
}

module.exports = new DeviceService(Device);
