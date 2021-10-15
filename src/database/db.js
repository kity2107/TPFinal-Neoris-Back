const mongoose = require("mongoose");
require("dotenv").config();

//si esta activa la local sino levanta la remota
const url =
  process.env.DATABASE_MONGODB_LOCAL || process.env.DATABASE_MONGODB_ONLINE;
mongoose
  .connect(url)
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));

module.exports = mongoose;
