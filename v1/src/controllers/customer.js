// controllers/customerController.js

const { Customer, Employee } = require("../models");

const CustomerRepository = require("../services/customer");

class CustomerController {
  async getAllCustomers(req, res) {
    try {
      const customers = await CustomerRepository.getAll({
        include: [
          {
            model: Device,
            include: [
              Customer,
              Employee, // Device içindeki Employee ilişkisini çekmek için
            ],
          },
        ],
      });
      return res.json(customers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCustomerById(req, res) {
    const { id } = req.params;
    try {
      const customer = await CustomerRepository.getById(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res.json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createCustomer(req, res) {
    const customerData = req.body;
    console.log("CUSTOMER DATA ", customerData);
    try {
      const createdCustomer = await CustomerRepository.create(customerData);
      return res.status(201).json(createdCustomer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCustomer(req, res) {
    const { id } = req.params;
    const customerData = req.body;
    try {
      CustomerRepository;
      const updatedCustomer = await CustomerRepository.update(id, customerData);
      if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res.json(updatedCustomer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCustomer(req, res) {
    const { id } = req.params;
    try {
      const deletedCustomer = await CustomerRepository.delete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getCustomerByEmail(req, res) {
    const { email } = req.body;
    try {
      const customer = await CustomerRepository.getByEmail(email);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res.status(200).json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new CustomerController();
