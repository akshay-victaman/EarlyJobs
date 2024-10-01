const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose
  .createConnection(process.env.MONGO_URI)
  .on("open", () => {
    console.log("Connected to Database");
  })
  .on("error", (error) => {
    console.log(error);
    console.log("Mongodb connection Error");
  });

module.exports = connection;