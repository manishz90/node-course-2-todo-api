const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID}  = require("mongodb");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
// this will be when app is running on heroku and not locally.
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// get /todos/123456
// id is url parameter
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }, () => {
    res.status(400).send();
  });
});


app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }, () => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // we want user to only update 'text' and 'completed' properties
  var body = _.pick(req.body, ['text', 'completed']);

  // console.log("req: " + JSON.stringify(req.body, undefined, 2));
  // console.log("id: " + id);
  // console.log("completed: " + body.completed);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send("hi");
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send("hi");
    }

    res.send({todo});
  }).catch((e) => {
    res.status(404).send("hi");
  })
});

app.listen(port, () => {
  console.log("Started on port " + port);
});

module.exports = {app};


// var newTodo = new Todo({
//   text: 'cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log("Saved todo", doc);
// }, (e) => {
//   console.log("unable to save todo");
// });


// var otherTodo = new Todo({
//   text: 'Edit this video',
// });
//
// otherTodo.save().then((doc) => {
//   console.log("Saved other todo", doc);
// }, (e) => {
//   console.log("unable to save other todo");
// });




// var user  = new User({
//   email: "manishz90"
// });
//
// user.save().then((doc) => {
//   console.log("User saved", doc);
// }, (e) => {
//   console.log("Unable to create user", e);
// });
