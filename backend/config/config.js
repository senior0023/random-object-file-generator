const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const config = {
  app: {
    port: process.env.APP_PORT || 80,
    host: process.env.APP_HOST || "0.0.0.0",
    baseUrl: process.env.APP_BASEURL,
  },
  generate_url: process.env.GENERATE_PATH || "",
  generate_path: path.join(__dirname, "..", "generatedFiles"),
  contentLimit: 2097152,
};

module.exports = config;
