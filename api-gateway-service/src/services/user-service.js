class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    return this.userRepository.create(data);
  }
}

module.exports = UserService;
