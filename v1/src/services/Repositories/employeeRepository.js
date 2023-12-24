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
      console.log("Son email:", email);
      let data = await this.Employee.findOne({
        where: { email: email },
      });
      // console.log("DATA SON", data);
      if (data) {
        return data;
      }
      if (!data) {
        // E-posta adresine sahip çalışan bulunamadı, bu durumu ele al
        console.log("Employee not found with the specified email");
        // İsterseniz bir hata fırlatabilir veya başka bir işlem yapabilirsiniz
        return false;
      }
    } catch (error) {
      console.error("getByEmail hatası:", error);
      // throw error;
    }
  }
}

module.exports = EmployeeRepository;
