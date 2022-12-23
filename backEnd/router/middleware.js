const express = require("express");
const router = express.Router();

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
module.exports = router;
