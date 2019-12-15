const mongoose = require("mongoose");

/*
 * load in the mongo models
 */
require("./models/user");
require("./models/app");

/*
 * Connects to MongoDB
 */
const MONGODB_URI = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';

function connect() {
  const opts = {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(MONGODB_URI, opts);
};

connect();
// const { connection } = mongoose;
mongoose.connection
  .on("error", err => {
    console.error(err);
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running."
    );
    process.exit();
  })
  .on("disconnected", connect);

module.exports = mongoose;
