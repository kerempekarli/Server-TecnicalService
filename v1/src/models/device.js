const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Customer = require("./customer");
const Employee = require("./employee");
const Repair = require("./repair");

const Device = sequelize.define("Device", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  issueDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
    defaultValue: "Pending",
    allowNull: false,
  },
  // Diğer alanları ekleyebilirsiniz
});

// Repair ve Device modelleri arasında bir ilişki tanımlama
// Repair ve Device modelleri arasında bir ilişki tanımlama
Device.hasMany(Repair);
Repair.belongsTo(Device);

// Employee ve Device modelleri arasında bir ilişki tanımlama
Device.belongsTo(Employee); // Bir cihazın bir çalışana ait olduğu varsayıldı.
Employee.hasMany(Device); // Bir çalışanın birden çok cihaza sahip olabileceği varsayıldı.

// Customer ve Device modelleri arasında bir ilişki tanımlama
Device.belongsTo(Customer); // Bir cihazın bir müşteriye ait olduğu varsayıldı.
Customer.hasMany(Device); // Bir müşterinin birden çok cihaza sahip olabileceği varsayıldı.

module.exports = Device;