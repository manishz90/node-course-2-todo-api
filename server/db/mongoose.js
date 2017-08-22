var mongoose = require("mongoose");

// let mongosse know we want to use promise of JS
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = {mongoose};
