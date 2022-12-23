const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

//------------> Hashing password <------------------
userSchema.pre("save", async function (next) {
  // console.log("Hii");
  const saltRounds = 12;
  if (this.isModified("password")) {
    // console.log("pre password");
    this.password = await bcrypt.hash(this.password, saltRounds);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, saltRounds);
  }
  next();
});

const User = mongoose.model("REGITRATIONS", userSchema);

module.exports = User;
