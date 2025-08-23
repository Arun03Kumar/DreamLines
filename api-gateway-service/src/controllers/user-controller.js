const { UsersRepository } = require("../repositories");
const { UserService } = require("../services");

const userService = new UserService(new UsersRepository());

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await userService.signIn(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  loginUser,
};
