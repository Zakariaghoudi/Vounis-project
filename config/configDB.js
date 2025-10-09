const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected :D");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
