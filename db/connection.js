require("dotenv").config();
const mongoose = require("mongoose");

const mongoDB_uri = process.env.MONGODB_URI;

function connectDB() {
  if (!mongoDB_uri) {
    throw new Error("MONGODB_URI environment variable not set");
  }

  mongoose
    .connect(mongoDB_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB.");
    })
    .catch((error) => {
      console.error("DB Connection error:", error);
    });
}

module.exports = connectDB;
