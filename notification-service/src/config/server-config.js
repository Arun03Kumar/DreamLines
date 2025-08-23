const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  EMAIL_ID: process.env.GMAIL_EMAIL,
  EMAIL_PASS: process.env.GMAIL_PASSWORD,
};
