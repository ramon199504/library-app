import React, { useState } from "react";
import BookList from "./BookList.js";
import BasePage from "./BasePage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const defaultBooks = [
    { name: "Harry Potter", id: "1" },
    { name: "Shrek", id: "2" },
    { name: "Don Quixote", id: "3" }
  ];

  const [books, setBooks] = React.useState(defaultBooks);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <BookList books={books} />
          </Route>
          <Route path="/view/:id/:page">
            <BasePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
