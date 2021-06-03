import React from "react";
import styles from "./styles.module.css";

const ImageNotice = ({ notice }) => {
  const { noticeFile, title, noticeDate } = notice;

  return (
    <div className={styles.container}>
      <a
        href={`http://localhost:5000/${noticeFile}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={`http://localhost:5000/${noticeFile}`} alt="imageNotice" />
      </a>
      <div className={styles.noticeDetails}>
        <p className={styles.noticeTitle}>{title}</p>
        <p className={styles.noticeDate}>{noticeDate}</p>
      </div>
    </div>
  );
};

export default ImageNotice;
