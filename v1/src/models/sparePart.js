const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize"); // Assume you have a sequelize instance file with connection settings

const SparePart = sequelize.define("SparePart", {
  stockID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  partName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchasePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minStockLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});



module.exports = SparePart;
