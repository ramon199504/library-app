import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TextPage from "./TextPage";
import { pageFormats } from "./PageFormats";
import Api from "./Api";

export default function BasePage(props) {
  let { id, page } = useParams();
  const [pageText, setPageText] = useState("");
  const [book, setBook] = useState("");

  const handlePageResponse = data => {
    setPageText(data.text);
  };

  const getPage = async () => {
    try {
      const response = await Api.post("/view", {
        _id: id,
        page: parseInt(page)
      });
      handlePageResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookResponse = data => {
    setBook(data);
  };

  const getBook = async () => {
    try {
      const response = await Api.post("/book", {
        _id: id
      });
      handleBookResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get data on component mount and refresh when the page number changes.
  useEffect(() => {
    getBook();
    getPage();
  }, [page]);

  //TODO: clean this up
  var nextPage, previousPage;
  if (page <= 1) {
    page = 1;
    previousPage = 1;
  } else {
    previousPage = parseInt(page) - 1;
  }
  if (page >= book.numPages) {
    page = book.numPages;
    nextPage = book.numPages;
  } else {
    nextPage = parseInt(page) + 1;
  }

  //TODO: consider renaming file to Page and HOC to basepage
  const Page = props => {
    if (props.format === pageFormats.TEXT) {
      return <TextPage text={pageText} />;
    } else {
      return <div>Another page</div>;
    }
  };
  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <Link to="/">Back to Library</Link> <br />
      <br />
      <br />
      <h1>{book.name}</h1>
      {/*TODO: remove format prop and add format to backend */}
      <Page style={{ minHeight: "500px" }} format={pageFormats.TEXT} />
      <Link to={`/view/${id}/${previousPage}`}>Previous Page</Link>
      <span style={{ padding: "0px 10px" }}>
        Page {`${page}`} / {`${book.numPages}`}
      </span>
      <Link to={`/view/${id}/${nextPage}`}>Next Page</Link>
    </div>
  );
}
