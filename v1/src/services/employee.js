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

  async updateEmployee(id, employeeData) {
    try {
      // Güncelleme işlemini gerçekleştir
      const result = await this.employeeRepository.update(id, employeeData);
      console.log("Update Result:", result);

      // Güncelleme başarılıysa result içinde güncellenen satır sayısı gibi bilgiler alabilirsiniz
      if (result[0] > 0) {
        return { message: "Employee updated successfully" };
      } else {
        throw new Error("No employee updated");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
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
