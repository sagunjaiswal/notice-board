import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { fetchNotice, noticeDisplayHandler } from "../../../utils/helperMethod";
import PdfNoticeRenderer from "../PdfNoticeRenderer";

const DisplayNotices = () => {
  const [uploadedNotices, setUploadedNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotice(setUploadedNotices, setIsLoading);
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : uploadedNotices.length ? (
    <div className={styles.noticeSectionContainer}>
      {uploadedNotices.map((notice) => noticeDisplayHandler(notice))}
    </div>
  ) : (
    <span className={styles.noNoticeWarning}>
      <img src="/assets/NoContent.svg" alt="no notice" />
      <h1>No notice</h1>
    </span>
  );
};

export default DisplayNotices;
