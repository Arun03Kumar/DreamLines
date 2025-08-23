const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../config");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    return this.userRepository.create(data);
  }

  async signIn(credentials) {
    try {
      const user = await this.userRepository.findByEmail(credentials.email);
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        ServerConfig.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return {
        user: { id: user.id, email: user.email },
        token: jwtToken,
      };
    } catch (error) {
      throw new Error("Error signing in user");
    }
  }

  async isAuthenticated(token) {
    try {
      const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);
      const user = await this.userRepository.findByEmail(decoded.email);
      return user.id;
    } catch (error) {
      return false;
    }
  }
}

module.exports = UserService;
