const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize"); // Assume you have a sequelize instance file with connection settings
const { Process, SparePart } = require("./");
const ProcessDetail = sequelize.define("ProcessDetail", {
  detailID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  processID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Processes", // Assuming the table name is 'Processes'
      key: "processID",
    },
  },
  stockID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "SpareParts", // Assuming the table name is 'SpareParts'
      key: "stockID",
    },
  },
  usedQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
});

// Defining associations with other tables

Process.hasOne(ProcessDetail, { foreignKey: "processID" });
ProcessDetail.belongsTo(Process, { foreignKey: "processID" });

module.exports = ProcessDetail;
