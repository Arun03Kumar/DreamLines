const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { connectAndConsume } = require("./config/queue-config");

const app = express();

connectAndConsume();

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
