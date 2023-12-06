// controllers/device.js
const DeviceService = require("../services/device"); // Yolunuzu güncelleyin
const Customer = require("../models/customer");
const Employee = require("../models/employee");

class DeviceController {
  async getAllDevices(req, res, next) {
    try {
      const devices = await DeviceService.getAll({
        include: [
          { model: Customer }, // Customer modelini ekleyerek customer ile join yapılır
          { model: Employee }, // Employee modelini ekleyerek employee ile join yapılır
        ],
      });
      return res.json(devices);
    } catch (error) {
      next(error);
    }
  }

  async getDeviceById(req, res, next) {
    const { id } = req.params;
    try {
      const device = await DeviceService.getById(id, {
        include: [{ model: Customer }, { model: Employee }],
      });

      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
      return res.json(device);
    } catch (error) {
      next(error);
    }
  }

  async getDeviceByCustomerId(req, res, next) {
    const { id } = req.body;
    try {
      const device = await DeviceService.getDevicesByCustomerId(id);
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
      return res.json(device);
    } catch (error) {
      next(error);
    }
  }
  async getDeviceByEmployeeId(req, res, next) {
    const { id } = req.body;
    try {
      const device = await DeviceService.getDevicesByEmployeeId(id);
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
      return res.json(device);
    } catch (error) {
      next(error);
    }
  }

  async createDevice(req, res, next) {
    const deviceData = req.body;
    try {
      console.log("DEvice data ", deviceData);
      const newDevice = await DeviceService.createDevice(deviceData);
      return res.status(201).json(newDevice);
    } catch (error) {
      console.log("ERROR BURADA", error);
      next(error);
    }
  }

  async updateDevice(req, res, next) {
    const { id } = req.params;
    const deviceData = req.body;
    try {
      const updatedDevice = await DeviceService.updateDevice(id, deviceData);
      if (!updatedDevice[0]) {
        return res.status(404).json({ error: "Device not found" });
      }
      return res.json({ message: "Device updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteDevice(req, res, next) {
    const { id } = req.params;
    try {
      const deletedDevice = await DeviceService.deleteDevice(id);
      if (!deletedDevice) {
        return res.status(404).json({ error: "Device not found" });
      }
      return res.json({ message: "Device deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async updateDeviceStatus(req, res) {
    try {
      const { deviceId } = req.params;
      const { status } = req.body;

      const updatedDevice = await DeviceStatusService.updateDeviceStatus(
        deviceId,
        status
      );

      res.json(updatedDevice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async patchDevice(req, res, next) {
    const { id } = req.params;
    const partialData = req.body;

    try {
      const patchedDevice = await DeviceService.patch(id, partialData);

      if (!patchedDevice) {
        return res.status(404).json({ error: "Device not found" });
      }

      return res.json(patchedDevice);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DeviceController();
