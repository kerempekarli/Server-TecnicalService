// repositories/employeeRepository.js
const BaseRepository = require("./baseRepository");
const { Employee } = require("../../models");

class EmployeeRepository extends BaseRepository {
  constructor() {
    super(Employee);
    this.Employee = Employee;
  }

  async getByEmail(email) {
    try {
      console.log("Son email:", email.email);

      let data = await this.Employee.findOne({
        where: { email: "kerempekarli@gmail.com" },
      });
      console.log("DATA SON", data);

      return data;
    } catch (error) {
      console.error("getByEmail hatası:", error);
      throw error;
    }
  }
}

module.exports = EmployeeRepository;
