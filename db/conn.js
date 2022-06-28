const { MongoClient } = require("mongodb");
const Db = process.env.MONGODB_CONNECT;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db)
      {
        _db = db.db("mernstack");
        console.log("Database connected..."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};