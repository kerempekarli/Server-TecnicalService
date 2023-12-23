// routes/auth.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");

// router.post("/register/customer", AuthController.registerCustomer);
// router.post("/login/customer", AuthController.loginCustomer);
router.post(
  "/register/employee",
  AuthController.registerEmployee.bind(AuthController)
);
router.post("/login/employee", AuthController.loginEmployee);

module.exports = router;
