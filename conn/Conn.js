const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully!!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

conn();