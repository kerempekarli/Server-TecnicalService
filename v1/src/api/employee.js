// api/employee.js
const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employee");

// GET all employees
// controllers/employeeController.js
router.get("/", EmployeeController.getAllEmployees.bind(EmployeeController));

// GET employee by ID
router.get("/:id", EmployeeController.getEmployeeById.bind(EmployeeController));

// POST create new employee
router.post("/", EmployeeController.createEmployee.bind(EmployeeController));

// PUT update employee by ID
router.put("/:id", EmployeeController.updateEmployee.bind(EmployeeController));

// DELETE employee by ID
router.delete(
  "/:id",
  EmployeeController.deleteEmployee.bind(EmployeeController)
);

module.exports = router;
