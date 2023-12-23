// models/repair.js

const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Repair = sequelize.define("Repair", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false, // İsterseniz bu alanı zorunlu yapabilirsiniz
    defaultValue: DataTypes.NOW,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  repairCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
});

module.exports = Repair;