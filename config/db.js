const mongoose = require('mongoose');
const config = require('./env');

const connectionDB = async () => {
  try {
    // options to avoid mongoose deprecated warnings
    await mongoose.connect(config.dbMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('DB connected!');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectionDB;
