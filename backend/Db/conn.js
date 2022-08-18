const mongoose = require("mongoose");

const Db = process.env.MONGO_URL || "mongodb://localhost:27017/redux_project";

mongoose
  .connect(Db)
  .then((res) => {
    console.log(`Db is running`);
  })
  .catch((err) => {
    console.log(err);
  });
