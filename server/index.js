require("dotenv").config();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

const app = require("./app.js");
const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () => console.log(`👃 sniffing the web: ${PORT}`));
}
