import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./styles.module.css";

const PdfNotice = ({ notice }) => {
  const { noticeFile, title, noticeDate } = notice;
  const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageNumber(numPages);
  };

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
          <Page pageNumber={1} width={200} />
        </Document>
      </a>

      <div className={styles.noticeDetails}>
        <p className={styles.noticeTitle}>{title}</p>
        <p className={styles.noticeDate}>{noticeDate}</p>
        <p style={{ fontSize: "10px" }}>
          {pageNumber}
          {pageNumber > 1 ? " pages" : " page"}
        </p>
      </div>
    </div>
  );
};
export default PdfNotice;
