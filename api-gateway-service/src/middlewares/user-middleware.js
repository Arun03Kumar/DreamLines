const { UsersRepository } = require("../repositories");
const { UserService } = require("../services");

const userService = new UserService(new UsersRepository());

async function checkAuth(req, res, next) {
  try {
    const isAuthenticated = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (isAuthenticated) {
      req.user = isAuthenticated;
    }
    next();
  } catch (error) {
    console.error("Error checking authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  checkAuth,
};
