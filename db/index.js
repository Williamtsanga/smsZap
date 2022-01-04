const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://tsanga:Mostwanted24@cluster0.xr2ia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection = null;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("smsZap");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },
  register: async ({username,password,email}) => {

    return await dbConnection.collection("users")
    .insertOne({username,password,email})
  },
  getContacts: async (user_id) => {
    return await dbConnection.collection('contacts').find({user_id}).toArray();
  },
  getUsers: async () => {
    return await dbConnection.collection("users").find({}).toArray()
  },
  getAllMessages: async (user_id) => {
    return await dbConnection.collection('messages').find({user_id}).toArray();
  },
  getContactMessages: async (user_id,contact_id) => {
    return await dbConnection.collection('messages').find({user_id,contact_id}).toArray();
  },
  getUser: async (username) => {
    return await dbConnection.collection("users").findOne({username});
  }
};