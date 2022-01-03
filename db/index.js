const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://tsanga:Mostwanted24@cluster0.xr2ia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection = null;
// dbo.connectToServer(function (err) {
//     if (err) {
//       console.error(err);
//       process.exit();
//     }
  
//     // start the Express server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port: ${PORT}`);
//     });
//   });
module.exports = {
  connectToServer: function (callback) {
    let see = client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("smsZap");
      console.log("Successfully connected to MongoDB.");
    console.log("here" , dbConnection)

      return "callback()";
    });
    console.log('see   => ' , see)
    return "dbConnection";
  },

  getDb: function () {
    return dbConnection;
  },
};