// api/customer.js
const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer");

// GET all customers
router.get("/", CustomerController.getAllCustomers.bind(CustomerController));

// GET customer by ID
router.get("/:id", CustomerController.getCustomerById.bind(CustomerController));

// POST create new customer
router.post("/", CustomerController.createCustomer.bind(CustomerController));

// PUT update customer by ID
router.put("/:id", CustomerController.updateCustomer.bind(CustomerController));

// DELETE customer by ID
router.delete(
  "/:id",
  CustomerController.deleteCustomer.bind(CustomerController)
);

router.post(
  "/getByEmail",
  CustomerController.getCustomerByEmail.bind(CustomerController)
);

module.exports = router;
