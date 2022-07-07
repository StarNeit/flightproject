const mongoose = require('mongoose');
module.exports.connectMongoDb = () => {
  const connect = () => {
    const mongoUrl = process.env.MONGODB_URL;
    mongoose.Promise = global.Promise;
    mongoose.connect(
      mongoUrl,
      {
        keepAlive: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      (err) => {
        let dbStatus = '';
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
        }
        dbStatus = `*    DB Connection: OK\n****************************\n`;
        console.log(dbStatus);
      }
    );
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
};
