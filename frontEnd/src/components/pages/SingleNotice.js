import React, { useState } from "react";
// import { noticeRenderer } from "../../helperMethod";
import { Document, Page, pdfjs } from "react-pdf";

function SingleNotice(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log("rendering notice files", props.notice.noticeFile);

  const goToPrevPage = () =>
    // this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    setPageNumber(pageNumber - 1);
  const goToNextPage = () =>
    // this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    setPageNumber(pageNumber + 1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <nav>
        <button onClick={goToPrevPage}>Prev</button>
        <button onClick={goToNextPage}>Next</button>
      </nav>
      <Document
        file={`http://localhost:5000/${props.notice.noticeFile}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
export default SingleNotice;
