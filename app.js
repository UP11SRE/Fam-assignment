const express = require("express");
const client = require("./src/client/elasticClient");
const routes = require("./src/router/router");
const script = require("./youtubeDataScript");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log("Client", client);

setInterval(() => {
  script(client);
}, 10000);
