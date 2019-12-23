import React, { useState } from "react";
import BookLabel from "./BookLabel";

export default function BookList(props) {
  const books = props.books.map(book => (
    <BookLabel key={book._id} id={book._id} name={book.name}></BookLabel>
  ));
  return (
    <>
      <ul>{books}</ul>
    </>
  );
}
