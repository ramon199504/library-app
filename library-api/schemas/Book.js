var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Book = new Schema({
  name: String,
  _id: Number
});

module.exports = mongoose.model("Book", Book);
