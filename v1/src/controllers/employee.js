// controllers/employeeController.js
const EmployeeService = require("../services/employee");

class EmployeeController {
  constructor(service) {
    this.service = service;
  }

  async getAllEmployees(req, res) {
    const employees = await this.service.getAllEmployees(); // this.service kullanılmalı
    res.json(employees);
  }

  async getEmployeeById(req, res) {
    const { id } = req.params;
    const employee = await this.service.getEmployeeById(id);
    res.json(employee);
  }

  async createEmployee(req, res) {
    const employeeData = req.body;
    console.log("Create Employee ", employeeData);
    const newEmployee = await this.service.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  }

  async updateEmployee(req, res) {
    const { id } = req.params;
    const employeeData = req.body;
    const updatedEmployee = await this.service.updateEmployee(id, employeeData);
    res.json(updatedEmployee);
  }

  async deleteEmployee(req, res) {
    const { id } = req.params;
    await this.service.deleteEmployee(id);
    res.json({ message: "Employee deleted successfully" });
  }
}

module.exports = new EmployeeController(EmployeeService);
