import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageOne } from "./Pages";
import TextPage from "./TextPage";
import { pageFormats } from "./PageFormats";

export default function BasePage(props) {
  let { id, page } = useParams();

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
      return <TextPage text={text} />;
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
      <Page format={pageFormats.TEXT} />
      <Link to={`/view/${id}/${previousPage}`}>Previous Page</Link>
      <span style={{ padding: "0px 10px" }}>Page {`${page}`}</span>
      <Link to={`/view/${id}/${nextPage}`}>Next Page</Link>
    </div>
  );
}
