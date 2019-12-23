var express = require("express");
var app = express(); //node server
var bodyParser = require("body-parser"); //middleware to format requests and responses properly
var mongoose = require("mongoose"); //api to talk to database
var db = mongoose.connect("mongodb://localhost/library", {
  useNewUrlParser: true
});

var Book = require("../schemas/Book");
var Pages = require("../schemas/Pages");

// Allow all requests from all domains & localhost
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

// Lets the system know that we want to use json
app.use(bodyParser.json());

// Determines parsing algorithm false = shallow parsing,
// doesnt allow nesting. True = deep parsing, allows nesting
app.use(bodyParser.urlencoded({ extended: true }));

// Handles fetching 'books' from DB
app.get("/books", function(request, response) {
  Book.find({}, function(err, data) {
    if (err) {
      response.status(500).send({ error: "Could not fetch products" });
    } else {
      response.send(data);
    }
  });
});

// Handles fetching individual book from DB
app.get("/book", function(request, response) {
  Book.find({ _id: request.body._id }, function(err, data) {
    if (err) {
      response.status(500).send({ error: "Could not fetch products" });
    }
    if (data.length === 0) {
      response.send({ status: 400, name: "" });
    } else {
      response.send(data[0]);
    }
  });
});

// Handles fetching 'pages' from DB
app.post("/view", function(request, response) {
  console.log("id = " + request.body.page);
  Pages.find({ _id: request.body._id }, function(err, data) {
    if (err) {
      response.status(500).send({ error: "Could not fetch products" });
    }
    if (data.length === 0) {
      response.send({ status: 400, name: "" });
    } else {
      response.send(
        data[0].pages.find(page => {
          return page.page === request.body.page;
        })
      );
    }
  });
});

app.listen(3004, function() {
  console.log("Library API running on port 3004...");
});
