var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Pages = new Schema({
  _id: Number,
  numPages: Number,
  pages: [{ page: Number, text: String }]
});

module.exports = mongoose.model("Pages", Pages);
