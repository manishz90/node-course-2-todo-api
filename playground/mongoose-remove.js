const {ObjectID}  = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: "59a1b1f56ae003208151364e"}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove("59a1b1f56ae003208151364e").then((todo) => {
  console.log(todo);
});
