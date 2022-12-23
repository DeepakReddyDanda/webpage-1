const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
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

//-----------> Generating Token <---------------

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECERET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("REGITRATIONS", userSchema);

module.exports = User;
