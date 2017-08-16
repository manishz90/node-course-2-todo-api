//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongodb server.");
  }
  console.log("connected to mongodb.");

  // db.collection("Todos").find({
  //   _id: new ObjectID("5994742fb8e98bb58410c871")
  // }).toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log("unable to fetch docs", err);
  // });

  db.collection("Users").find({
    name: "Mike"
  }).count().then((count) => {
    console.log("Count", count);
  }, (err) => {
    console.log("unable to fetch docs", err);
  });


  // db.collection("Todos").find({
  //   _id: new ObjectID("5994742fb8e98bb58410c871")
  // }).count().then((count) => {
  //   console.log("Count", count);
  // }, (err) => {
  //   console.log("unable to fetch docs", err);
  // });

  //db.close();
});
