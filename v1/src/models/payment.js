// models/payment.js

const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Repair = require("./repair");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Diğer alanlar...
  },
  {
    // Modelin diğer ayarları
  }
);

// Payment modeli Repair modeline ait
Payment.belongsTo(Repair, {
  foreignKey: {
    allowNull: false,
  },
});
Repair.hasOne(Payment, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Payment;
