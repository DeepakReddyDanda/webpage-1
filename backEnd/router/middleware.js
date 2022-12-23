const express = require("express");
const router = express.Router();

require("../database/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello this is router home page");
});

router.post("/register", (req, res) => {
  const { name, email, phone, work, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !work || !password || !confirmPassword) {
    return res.status(422).json({ error: "plz fill all the fields" });
  }
  User.findOne({ email: email }).then((userExist) => {
    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    }
    User.findOne({ phone: phone }).then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "User already exist" });
      }
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        confirmPassword,
      });
      user
        .save()
        .then(() => {
          res
            .status(201)
            .json({ message: "user register successfully" })
            .catch((err) =>
              res.status(500).json({ error: "Failed to register" })
            );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
module.exports = router;
