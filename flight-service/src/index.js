const express = require("express");
const { PORT } = require("./config/server-config");

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
