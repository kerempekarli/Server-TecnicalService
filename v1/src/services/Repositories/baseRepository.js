// repositories/baseRepository.js
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll(options) {
    return this.model.findAll(options);
  }

  async getById(id, options = {}) {
    // options parametresindeki include seçeneğini kontrol et
    const includeOption = options.include || null;

    const queryOptions = {
      where: { id },
      include: includeOption,
    };

    return this.model.findByPk(id, queryOptions);
  }

  create(data) {
    return this.model.create(data);
  }

  update(id, data) {
    return this.model.update(data, { where: { id } });
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }
  async patch(id, data) {
    const [numOfAffectedRows] = await this.model.update(data, {
      where: { id: id },
    });

    if (numOfAffectedRows === 0) {
      throw new Error(`Entity with id ${id} not found`);
    }

    // Güncellenen veriyi almak için ayrı bir sorgu yapabilirsiniz
    const updatedEntity = await this.getById(id);

    return updatedEntity;
  }
}

module.exports = BaseRepository;