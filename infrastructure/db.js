const mongoose = require('mongoose');
const db = mongoose.connection;

const DBConnect = () => {
  mongoose.connect(
    "mongodb+srv://admin:Mudar@123@logomaiseuvirodev.vxe0z.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return new Promise((resolve, reject) => {
    db.once('open', () => resolve());
    db.on('error', () => reject());
  })
};

module.exports = {
  DBConnect
};
