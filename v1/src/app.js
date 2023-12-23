// app.js
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
  ProcessRoute,
  ProcessDetailRoute,
  SparePartRoute,
} = require("./api/index");
const sequelize = require("./loaders/sequelize");
const {
  Customer,
  Device,
  Employee,
  Repair,
  Payment,
  Process,
  SparePart,
} = require("./models");
const initialize = require("./helpers/initialize");

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
    return Process.sync();
  })
  .then(() => {
    return SparePart.sync();
  })
  .then(() => {
    console.log("Database connection has been established successfully.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000); // Wait for 1000 milliseconds (1 second)
    });
  })
  .then(() => {
    return initialize();
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
// İlk admin hesabını oluştur

app.listen(process.env.APP_PORT, async () => {
  console.log("Server is running on " + process.env.APP_PORT);
  app.use("/customers", CustomerRoute);
  app.use("/repair", RepairRoute);
  app.use("/employees", EmployeeRoute);
  app.use("/devices", DeviceRoute);
  app.use("/auth", AuthRoute);
  app.use("/process", ProcessRoute);
  app.use("/process-detail", ProcessDetailRoute);
  app.use("/spare-part", SparePartRoute);
});
