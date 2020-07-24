const mongoose = require("mongoose");
const db = mongoose.connection;

const DBConnect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return new Promise((resolve, reject) => {
    db.once("open", () => resolve());
    db.on("error", () => reject());
  });
};

module.exports = {
  DBConnect,
};
