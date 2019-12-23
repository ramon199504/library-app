import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TextPage from "./TextPage";
import { pageFormats } from "./PageFormats";
import Api from "./Api";

export default function Page(props) {
  let { id, page } = useParams();
  const [pageData, setPageData] = useState("");
  const [book, setBook] = useState("");

  const handlePageResponse = data => {
    if (data.status === 400) {
      setPageData("");
    } else {
      setPageData(data);
    }
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
    if (data.status === 400) {
      setBook("");
    } else {
      setBook(data);
    }
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

  // Edge case checking to keep pages inside page bounds
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

  // Higher order component, any new formats should be added here.
  const BasePage = () => {
    console.log(pageData);
    if (pageData.format === pageFormats.TEXT) {
      return <TextPage data={pageData} />;
    } else {
      return <h2>Formato no reconocido</h2>;
    }
  };

  if (book != "" && pageData != "") {
    return (
      <div style={{ margin: "auto", maxWidth: "80%" }}>
        <Link to="/">Devuelta a la librería</Link>
        <div style={{ textAlign: "center" }}>
          <h1>{book.name}</h1>
          <BasePage style={{ minHeight: "500px" }} />
          <Link to={`/view/${id}/${previousPage}`}>Página Anterior</Link>
          <span style={{ padding: "0px 10px" }}>
            Página {`${page}`} / {`${book.numPages}`}
          </span>
          <Link to={`/view/${id}/${nextPage}`}>Próxima Página</Link>
        </div>
      </div>
    );
  } else {
    return <h1>Página no encontrada</h1>;
  }
}
