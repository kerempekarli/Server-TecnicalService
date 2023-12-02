// repositories/customerRepository.js
const BaseRepository = require("./baseRepository");
const { Customer } = require("../../models"); // veya model dosyanıza uygun dosya yolu

class CustomerRepository extends BaseRepository {
  constructor() {
    super(Customer);
  }

  async getByEmail(email) {
    return this.model.findOne({
      where: {
        email: email,
      },
    });
  }
}

module.exports = CustomerRepository;
