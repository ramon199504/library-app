import React, { useState, useEffect } from "react";
import BookList from "./BookList.js";
import BasePage from "./BasePage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Api from "./Api";

function App() {
  const defaultBooks = [
    { name: "Harry Potter", id: "1" },
    { name: "Shrek", id: "2" },
    { name: "Don Quixote", id: "3" }
  ];
  const [books, setBooks] = React.useState(defaultBooks);

  const handleBooksResponse = data => {
    setBooks(data);
  };

  useEffect(() => getBooks(), []);
  const getBooks = async () => {
    try {
      const response = await Api.get("/books", {});
      handleBooksResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <BookList books={books} />
          </Route>
          <Route path="/view/:id/:page">
            <BasePage books={books} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
