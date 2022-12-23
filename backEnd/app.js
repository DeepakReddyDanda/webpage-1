const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./database/connection");
app.use(express.json());
// const User = require("./model/userSchema");

const PORT = process.env.PORT;

app.use(require("./router/middleware"));

//Middleware
const middleware = (req, res, next) => {
  console.log(`this is my middleware`);
  next();
};

app.get("/", (req, res) => {
  res.send("Hello this is home page");
});

app.get("/about", middleware, (req, res) => {
  console.log(`Hello About`);
  res.send("Hello this is about page");
});

app.get("/contact", (req, res) => {
  res.send("Hello this is contact page");
});

app.get("/signin", (req, res) => {
  res.send("Hello this is signin page");
});

app.get("/signin", (req, res) => {
  res.send("Hello this is signin page");
});

app.get("/signup", (req, res) => {
  res.send("Hello this is signup page");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
