const express = require("express");
// const helmet = require("helmet");
const config = require("./config/index");
const cors = require("cors");

const {
  CustomerRoute,
  RepairRoute,
  EmployeeRoute,
  DeviceRoute,
  AuthRoute,
} = require("./api/index");
const sequelize = require("./loaders/sequelize");
const { Customer, Device, Employee, Repair, Payment } = require("./models");
const EmployeeServices = require("./services/employee");

config();

const app = express();
app.use(express.json());
app.use(cors());

// app.use(helmet());
// Veritabanını oluştur
sequelize.sync({ force: false }).then(() => {
  console.log("Database tables created");
});

sequelize
  .authenticate()
  .then(() => {
    return Customer.sync();
  })
  .then(() => {
    return Employee.sync();
  })
  .then(() => {
    return Repair.sync();
  })
  .then(() => {
    return Device.sync();
  })
  .then(() => {
    return Payment.sync();
  })
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(process.env.APP_PORT, async () => {
  console.log("Server is running on " + process.env.APP_PORT);
  app.use("/customers", CustomerRoute);
  app.use("/repair", RepairRoute);
  app.use("/employees", EmployeeRoute);
  app.use("/devices", DeviceRoute);
  app.use("/auth", AuthRoute);
});
