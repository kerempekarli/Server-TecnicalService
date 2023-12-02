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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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
      res.status(500).json({ error: error.message });
    }
  }

  async loginEmployee(req, res) {
    try {
      const { email, password } = req.body;
      console.log("email", email);
      let employee = await EmployeeService.getEmployeeByEmail({
        email,
      });

      console.log("burası ", employee);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const passwordMatch = await bcrypt.compare(password, employee.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = generateToken(employee); // "this" ekledik
      employee.password = null;

      res.status(200).json({ user: employee, token: token });
    } catch (error) {
      console.log("Error", error);
      res.status(401).json({ error: error.message });
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
