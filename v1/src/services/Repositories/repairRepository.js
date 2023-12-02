// repositories/repairRepository.js
const BaseRepository = require("./baseRepository");
const Repair = require("../../models/repair");

class RepairRepository extends BaseRepository {
  // Buraya özel metodlar eklenebilir
}

module.exports = new RepairRepository(Repair);
