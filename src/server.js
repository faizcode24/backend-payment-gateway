require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});