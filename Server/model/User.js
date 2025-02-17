const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", Userschema);

module.exports = User;
