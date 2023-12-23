// services/auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Customer, Employee } = require("../models");

class AuthService {
  async registerCustomer(customerData) {
    const hashedPassword = await bcrypt.hash(customerData.password, 10);
    customerData.password = hashedPassword;

    const newCustomer = await Customer.create(customerData);
    return newCustomer;
  }

  async loginCustomer(email, password) {
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = this.generateToken(customer);
    return { token: token, customer: customer };
  }

  async registerEmployee(employeeData) {
    console.log("WORKED");
    const hashedPassword = await bcrypt.hash(employeeData.password, 10);
    employeeData.password = hashedPassword;
    console.log(employeeData.password);
    const newEmployee = await Employee.create(employeeData);
    return newEmployee;
  }

  async loginEmployee(email, password) {
    console.log("LOGIN EMPLOYEE DATA ", email);
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      throw new Error("Employee not found");
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = this.generateToken(employee);
    return token;
  }

  generateToken(user) {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your-secret-key",
      {
        expiresIn: "1h", // Token süresi, isteğe bağlı olarak değiştirilebilir
      }
    );
    return token;
  }
}

module.exports = new AuthService();
