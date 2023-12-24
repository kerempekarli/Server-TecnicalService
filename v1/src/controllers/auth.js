// controllers/authController.js
const httpStatus = require("http-status");
const EmployeeService = require("../services/employee");
const AuthService = require("../services/auth"); // AuthService modülünü ekledik
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async registerCustomer(req, res) {
    try {
      const newCustomer = await AuthService.registerCustomer(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {}
  }

  async loginCustomer(req, res) {
    try {
      const { email, password } = req.body;
      const customerData = await AuthService.loginCustomer(email, password);
      res.status(200).json(customerData);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async registerEmployee(req, res) {
    try {
      const employeeData = req.body;

      const hashedPassword = await bcrypt.hash(employeeData.password, 10);
      employeeData.password = hashedPassword;
      const newEmployee = await EmployeeService.createEmployee(employeeData);
      console.log("EMPLOYEE", employeeData);
      res.status(201).json(newEmployee);
    } catch (error) {
      console.log(error);
    }
  }

  async loginEmployee(req, res) {
    try {
      console.log("req 123123123", req.body);
      const { email, password } = req.body;
      console.log("email", email);
      let employee = await EmployeeService.getEmployeeByEmail(email);

      console.log("getEmployeeByEmail'den gelen employee ", employee);
      if (!employee) {
        // throw new Error("Employee not found");
      }

      const passwordMatch = await bcrypt.compare(password, employee.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = generateToken(employee); // "this" ekledik
      employee.password = null;

      console.log(employee);
      res.status(200).json({ user: employee, token: token });
    } catch (error) {
      console.log("Error", error);
      res.status(401).json({ error: error.message });
    }
  }
  async changePasswordEmployee(req, res) {
    try {
      const { employeeId, oldPassword, newPassword } = req.body;

      // Eski şifreyi kontrol et
      let employee = await EmployeeService.getEmployeeById(employeeId);
      if (!employee) {
        throw new Error("Employee not found");
      }
      employee = employee.dataValues;
      console.log(employee);
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        employee.password
      );
      if (!passwordMatch) {
        console.log("parolalarl eşleşmiyor");
        res.status(400).send("Lütfen parolanızı doğru girin");
        return;
      }

      // Yeni şifreyi hashle
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Şifre değişikliğini içeren güncellenen nesneyi oluştur
      employee.password = hashedNewPassword;

      // Şifreyi güncelle
      await EmployeeService.updateEmployee(employee.id, {
        password: employee.password,
      });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

// HELPERS
const generateToken = (user) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "your-secret-key",
    {
      expiresIn: "1h", // Token süresi, isteğe bağlı olarak değiştirilebilir
    }
  );
  return token;
};

module.exports = new AuthController();
