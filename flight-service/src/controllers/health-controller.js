function check(req, res) {
  res.status(200).json({ status: "healthy" });
}

module.exports = { check };
