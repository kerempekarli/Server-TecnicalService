// initialize.js
const sequelize = require("../loaders/sequelize");
const EmployeeService = require("../services/employee");
const AuthService = require("../services/auth");

async function initializeApp() {
  try {
    // Veritabanınızı senkronize edin (migrasyonları çalıştırın)
    await sequelize.sync();

    // İLERİDE BURALAR PROCESS.ENV den gelecek.

    // İlk admin hesabını ekleyin
    const existingAdmin = await EmployeeService.getEmployeeByEmail(
      "kerempekarli@gmail.com"
    );

    if (!existingAdmin) {
      const employeeData = {
        firstName: "Kerem",
        lastName: "Pekarlı",
        email: "kerempekarli@gmail.com",
        phoneNumber: "123456789",
        password: "123123", // Şifreyi güvenli bir şekilde hashleme işlemi AuthService.registerEmployee içinde yapılır
        role: "staff", // Varsayılan olarak staff atanır, isteğe bağlı olarak role ekleyebilirsiniz
        // Diğer özellikleri ekleyebilirsiniz
      };

      await AuthService.registerEmployee(employeeData);

      console.log("İlk admin hesabı başarıyla oluşturuldu!");
    } else {
      console.log("İlk admin hesabı zaten var.");
    }
  } catch (error) {
    console.error("Uygulama başlatılırken bir hata oluştu:", error);
  }
}

module.exports = initializeApp;
