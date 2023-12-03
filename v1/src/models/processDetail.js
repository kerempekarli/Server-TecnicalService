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
});

// Defining associations with other tables
ProcessDetail.belongsTo(Process, { foreignKey: "processID" });
ProcessDetail.hasOne(SparePart, { foreignKey: "stockID" });

module.exports = ProcessDetail;
