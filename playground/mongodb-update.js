//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongodb server.");
  }
  console.log("connected to mongodb.");

db.collection("Todos").findOneAndUpdate({
  _id: new ObjectID("599704adcc893d72eae4757a")
},{
  $set: {
    completed: true
  }
},
{
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

db.collection("Users").findOneAndUpdate({
  _id: new ObjectID("599460ce40da8812ecf179db")
},{
  $set: {
    name: "Manish"
  },
  $inc: {
    age: 1
  }
},
{
  returnOriginal: false
}).then((result) => {
  console.log(result);
});




  //db.close();
});
