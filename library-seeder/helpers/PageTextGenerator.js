const https = require("https");
const http = require("http");
var fs = require("fs");

const numPages = 13;
const numBooks = 7;

const nameURL =
  "http://names.drycodes.com/1?nameOptions=starwarsTitles&separator=space&format=text";
const textURL = "https://loripsum.net/api/5/medium/plaintext/";

var completedNamesReqs = 0;
var completedTextReqs = 0;
var textResponses = [];
var nameResponses = [];
var booksJSON = [];
var pagesJSON = [];

const processTextResponses = () => {
  for (var i = 0; i < numBooks; ++i) {
    var book = { id: i, numPages: numPages, pages: [] };
    for (var j = 0; j < numPages; ++j) {
      book.pages.push({ page: j + 1, text: textResponses[i * numPages + j] });
    }
    pagesJSON.push(book);
  }
  var jsonPages = JSON.stringify(pagesJSON);
  fs.writeFile("../data/pages/pages.json", jsonPages, err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

const processNameResponses = () => {
  for (var i = 0; i < numBooks; ++i) {
    booksJSON.push({ name: nameResponses[i], id: i });
  }
  var jsonBooks = JSON.stringify(booksJSON);
  fs.writeFile("../data/books/books.json", jsonBooks, err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

for (var j = 0; j < numBooks * numPages; ++j) {
  https.get(textURL, res => {
    res.on("data", d => {
      textResponses.push(d.toString("utf8"));
    });
    res.on("end", () => {
      if (completedTextReqs++ == numBooks * numPages - 1) {
        // All downloads are completed
        processTextResponses();
        console.log("All text done!");
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
        console.log("All name done!");
      }
    });
  });
}
