import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./ImageNotice.module.css";

const PdfNotice = ({ notice }) => {
  const { _id, noticeFile, title, noticeDate } = notice;
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className={styles.pdfBox}>
      <a
        key={_id}
        href={`http://localhost:5000/${noticeFile}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Document
          file={`http://localhost:5000/${noticeFile}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} height="1200" width="400" />
        </Document>
      </a>
      <p
        style={{
          color: "#4B0082",
          overflow: "hidden",
          margin: "20px 0 20px 0",
        }}
      >
        {title}
      </p>
      <p style={{ color: "#808080", margin: "20px 0 20px 0" }}>{noticeDate}</p>
      <p style={{ fontSize: "10px" }}>
        Page {pageNumber} / {numPages}
      </p>

      {numPages !== 1 ? (
        <>
          <button
            className={styles.pageControllerBtn}
            style={{ marginRight: "16px", marginTop: "24px" }}
            onClick={goToPrevPage}
          >
            <img src="assets/previous.svg" alt="previous" />
          </button>
          <button
            className={styles.pageControllerBtn}
            style={{ marginLeft: "16px", marginTop: "24px" }}
            onClick={goToNextPage}
            disabled={pageNumber === numPages ? true : false}
          >
            <img src="assets/next.svg" alt="next" />
          </button>
        </>
      ) : null}
    </div>
  );
};
export default PdfNotice;
