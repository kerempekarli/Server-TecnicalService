const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const { Device, ProcessDetail } = require("./");

const Process = sequelize.define("Process", {
  processID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), // Otomatik olarak şu anki tarih ve saat değeri alınacak
  },
  endDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Process.hasOne(Device);
Device.hasMany(Process);

// Inverse associations (assuming you have corresponding associations in Device and SparePart models)

// You can add relationship definitions here, such as:
// Process.belongsTo(Request);

module.exports = Process;