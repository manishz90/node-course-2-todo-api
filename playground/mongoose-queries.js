const {objectID}  = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

var userId = "599c339426fa9660054a2980";
var id = "599ff416553c12c40ee989dd";

if (!objectID.isValid(id)) {
  console.log("Id not valid");
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log("Todos", todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log("Todo", todo);
});

Todo.findById(id).then((todoById) => {
  if (!todoById) {
    console.log("Id not found");
  }
  console.log("todoById", todoById);
}).catch((e) => console.log(e));

User.findById(userId).then((userById) => {
  if (!userById) {
    console.log("user not found");
  }
  console.log("user", JSON.stringify(userById, undefined, 2));
}).catch((e) => console.log(e));
