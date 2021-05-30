import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./ImageNotice.module.css";

const PdfNotice = ({ notice }) => {
  const { noticeFile, title, noticeDate } = notice;
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
        href={`http://localhost:5000/${noticeFile}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Document
          file={`http://localhost:5000/${noticeFile}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </a>

      <div className={styles.noticeDetails}>
        <p className={styles.noticeTitle}>{title}</p>
        <p className={styles.noticeDate}>{noticeDate}</p>
        <p style={{ fontSize: "10px" }}>
          Page {pageNumber} / {numPages}
        </p>

        {numPages !== 1 ? (
          <div className={styles.btnContainer}>
            <button
              className={`${styles.pageControllerBtn} ${styles.prevBtn}`}
              onClick={goToPrevPage}
            >
              <img src="assets/previous.svg" alt="previous" />
            </button>
            <button
              className={`${styles.pageControllerBtn} ${styles.nextBtn}`}
              onClick={goToNextPage}
              disabled={pageNumber === numPages ? true : false}
            >
              <img src="assets/next.svg" alt="next" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default PdfNotice;
