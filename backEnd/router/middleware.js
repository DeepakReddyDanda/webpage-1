const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("../database/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello this is router home page");
});

//----------------> Using promises <--------------

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, confirmPassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !confirmPassword) {
//     return res.status(422).json({ error: "plz fill all the fields" });
//   }

//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "Email already exist" });
//     }
//     User.findOne({ phone: phone }).then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Phone No already exist" });
//       }
//       const user = new User({
//         name,
//         email,
//         phone,
//         work,
//         password,
//         confirmPassword,
//       });
//       user
//         .save()
//         .then(() => {
//           res
//             .status(201)
//             .json({ message: "user register successfully" })
//             .catch((err) =>
//               res.status(500).json({ error: "Failed to register" })
//             );
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   });
// });

//-------------> Using async <-------------

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !work || !password || !confirmPassword) {
    return res.status(422).json({ error: "plz fill all the fields" });
  }

  if (password != confirmPassword) {
    return res
      .status(422)
      .json({ error: "password and confirm password not matched" });
  }

  try {
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const phoneExist = await User.findOne({ phone: phone });
    if (phoneExist) {
      return res.status(422).json({ error: "Phone number already exist" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      confirmPassword,
    });

    await user.save();
    res.status(201).json({ message: "user registration successfull" });
  } catch (err) {
    console.log(err);
  }
});

//-----------> login route <-------------

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Enter both the fields" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const passwordVerify = await bcrypt.compare(password, userLogin.password);
      if (!passwordVerify) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User signin successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
