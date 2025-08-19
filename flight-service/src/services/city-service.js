class CityService {
  constructor(cityRepository) {
    this.cityRepository = cityRepository;
  }

  async createCity(data) {
    return this.cityRepository.create(data);
  }

  async getCityById(id) {
    return this.cityRepository.get(id);
  }

  async getAllCities() {
    return this.cityRepository.getAll();
  }

  async updateCity(id, data) {
    return this.cityRepository.update(id, data);
  }

  async deleteCity(id) {
    return this.cityRepository.destroy(id);
  }
}
module.exports = CityService;
