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
          <Page pageNumber={pageNumber} height="1200" width="200" />
        </Document>
      </a>
      <p style={{ color: "#4B0082" }}>{title}</p>
      <p style={{ color: "#808080	" }}>{noticeDate}</p>
      <p style={{ fontSize: "10px" }}>
        Page {pageNumber} / {numPages}
      </p>

      <nav>
        <button className="next-prev-btn" onClick={goToPrevPage}>
          &lt;
        </button>
        <button className="next-prev-btn" onClick={goToNextPage}>
          &gt;
        </button>
      </nav>
    </div>
  );
};
export default PdfNotice;
