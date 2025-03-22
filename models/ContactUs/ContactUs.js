const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },

  email: {
    type: String,
  },
  organization: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ContactUs", ContactSchema);
