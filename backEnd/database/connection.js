const mongoose = require("mongoose");

//Data Base connection
const dataBase = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose
  .connect(dataBase)
  .then(() => {
    console.log(`DB connected successfully`);
  })
  .catch((err) => console.log(`DB not conected`));
