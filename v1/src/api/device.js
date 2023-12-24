// routes/device.js
const express = require("express");
const router = express.Router();
const DeviceController = require("../controllers/device");
// GET all devices
router.get("/", DeviceController.getAllDevices.bind(DeviceController));
router.get(
  "/getCustomerDevices",
  DeviceController.getDeviceByCustomerId.bind(DeviceController)
);
router.get(
  "/getEmployeeDevices",
  DeviceController.getDeviceByEmployeeId.bind(DeviceController)
);

// GET device by ID
router.get("/:id", DeviceController.getDeviceById.bind(DeviceController));
router.get(
  "/unfinished-with-employee-one/:userId",
  DeviceController.getUnfinishedDevicesWithEmployeeOne.bind(DeviceController)
);

// POST create new device
router.post("/", DeviceController.createDevice.bind(DeviceController));

// PUT update device by ID
router.put("/:id", DeviceController.updateDevice.bind(DeviceController));

// DELETE device by ID
router.delete("/:id", DeviceController.deleteDevice);

router.put("/:deviceId/status", DeviceController.updateDeviceStatus);
router.patch("/:id", DeviceController.patchDevice.bind(DeviceController));

module.exports = router;
