import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageOne } from "./Pages";
import TextPage from "./TextPage";
import { pageFormats } from "./PageFormats";
import Api from "./Api";

export default function BasePage(props) {
  let { id, page } = useParams();
  const [pageText, setPageText] = useState("");
  //TODO: Created request to get specific book instead of passing it as props.
  const book = props.books.find(book => {
    return book._id == parseInt(id);
  });

  const handlePageResponse = data => {
    console.log(data);
    setPageText(data.text);
  };

  const getPage = async () => {
    try {
      console.log(id + parseInt(page));
      const response = await Api.post("/view", {
        _id: id,
        page: parseInt(page)
      });
      handlePageResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO: call in lifecycle method.
  getPage();

  //TODO: clean this up
  var nextPage, previousPage;
  if (page <= 1) {
    previousPage = 1;
  } else {
    previousPage = parseInt(page) - 1;
  }
  nextPage = parseInt(page) + 1;

  //TODO: REMOVE after backend is set
  const text = PageOne;

  //TODO: consider renaming file to Page and HOC to basepage
  const Page = props => {
    if (props.format === pageFormats.TEXT) {
      return <TextPage text={pageText} />;
    } else {
      return <div>Another page</div>;
    }
  };
  return (
    <div>
      <Link to="/">Back to Library</Link> <br />
      <br />
      <br />
      Displaying book ID: {id} page: {page}
      {/*TODO: remove format prop and add format to backend */}
      <Page format={pageFormats.TEXT} />
      <Link to={`/view/${id}/${previousPage}`}>Previous Page</Link>
      <span style={{ padding: "0px 10px" }}>Page {`${page}`} / }</span>
      <Link to={`/view/${id}/${nextPage}`}>Next Page</Link>
    </div>
  );
}
