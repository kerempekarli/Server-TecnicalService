// services/customerService.js
const CustomerRepository = require("./Repositories/customerRepository");

class CustomerService extends CustomerRepository {
  // BaseRepository'den gelen metodları kullanabilir ve özelleştirebilirsiniz.

  // Örneğin, BaseRepository'den gelen create metodunu burada özelleştiriyoruz.
  async createCustomer(customerData) {
    // Özel işlemler eklenebilir
    console.log("Custom logic for creating a customer");

    // CustomerRepository'den gelen create metodunu kullanıyoruz.
    return this.create(customerData);
  }

  async getCustomerByEmail(email) {
    return this.getByEmail(email);
  }

  // Diğer özel metodları buraya ekleyebilirsiniz.
}

module.exports = new CustomerService();
