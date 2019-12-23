import React, { useState, useEffect } from "react";
import BookList from "./BookList.js";
import Page from "./Page.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Api from "./Api";

function App() {
  const [books, setBooks] = React.useState("");

  const handleBooksResponse = data => {
    setBooks(data);
  };

  const getBooks = async () => {
    try {
      const response = await Api.get("/books", {});
      handleBooksResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get books when component first mounts
  useEffect(() => getBooks(), []);

  const List = () => {
    if (books === "") {
      return <h1>No hay libros disponibles</h1>;
    } else {
      return <BookList books={books} />;
    }
  };
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/view/:id/:page">
            <Page />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
