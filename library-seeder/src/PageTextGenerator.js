const https = require("https");
const http = require("http");
var fs = require("fs");

const maxNumPages = 15;
const numBooks = 12;

const nameURL =
  "http://names.drycodes.com/1?nameOptions=starwarsTitles&separator=space&format=text";
const textURL = "https://loripsum.net/api/3/long/plaintext/";

var completedNamesReqs = 0;
var completedTextReqs = 0;
var textResponses = [];
var nameResponses = [];
var booksJSON = [];
var pagesJSON = [];
var numPages = [];
for (var i = 0; i < numBooks; ++i) {
  numPages.push(Math.floor(Math.random() * +maxNumPages + 1));
}

const processTextResponses = () => {
  for (var i = 0; i < numBooks; ++i) {
    var book = { id: i, pages: [] };
    for (var j = 0; j < numPages[i]; ++j) {
      book.pages.push({
        page: j + 1,
        format: "text",
        text: textResponses[i * maxNumPages + j]
      });
    }
    pagesJSON.push(book);
  }
  var jsonPages = JSON.stringify(pagesJSON);
  fs.writeFile("../data/pages/pages.json", jsonPages, err => {
    if (err) throw err;
    console.log("The Pages file has been saved!");
  });
};

const processNameResponses = () => {
  for (var i = 0; i < numBooks; ++i) {
    booksJSON.push({ name: nameResponses[i], id: i, numPages: numPages[i] });
  }
  var jsonBooks = JSON.stringify(booksJSON);
  fs.writeFile("../data/books/books.json", jsonBooks, err => {
    if (err) throw err;
    console.log("The Books file has been saved!");
  });
};

for (var j = 0; j < numBooks * maxNumPages; ++j) {
  https.get(textURL, res => {
    res.on("data", d => {
      textResponses.push(d.toString("utf8"));
    });
    res.on("end", () => {
      if (completedTextReqs++ == numBooks * maxNumPages - 1) {
        // All downloads are completed
        processTextResponses();
      }
    });
  });
}

for (var i = 0; i < numBooks; ++i) {
  http.get(nameURL, res => {
    res.on("data", d => {
      nameResponses.push(d.toString("utf8"));
    });
    res.on("end", () => {
      if (completedNamesReqs++ == numBooks - 1) {
        // All downloads are completed
        processNameResponses();
      }
    });
  });
}
