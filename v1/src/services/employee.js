// services/employeeService.js
const EmployeeRepository = require("./Repositories/employeeRepository");

class EmployeeService {
  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  getAllEmployees() {
    return this.employeeRepository.getAll();
  }

  getEmployeeById(id) {
    return this.employeeRepository.getById(id);
  }

  createEmployee(employeeData) {
    return this.employeeRepository.create(employeeData);
  }

  updateEmployee(id, employeeData) {
    return this.employeeRepository.update(id, employeeData);
  }

  deleteEmployee(id) {
    return this.employeeRepository.delete(id);
  }

  async getEmployeeByEmail(email) {
    try {
      await console.log("STEP 1 ÇALISTI");
      let data = await this.employeeRepository.getByEmail(email);
      return data;
    } catch (error) {
      console.error("getEmployeeByEmail hatası:", error);
      throw error;
    }
  }
}

module.exports = new EmployeeService();
