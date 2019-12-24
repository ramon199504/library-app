var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Book = new Schema({
  _id: Number,
  name: String,
  numPages: Number
});

module.exports = mongoose.model("Book", Book);
