const express = require("express");
const bodyParser = require("body-parser");
const { serverConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
  Logger.info("Successfully started the server", {});
});
