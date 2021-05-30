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
        <img
          src={`http://localhost:5000/${noticeFile}`}
          alt="imageNotice"
          height="500px"
          width="400px"
        />
      </a>
      <div className={styles.noticeDetails}>
        <p className={styles.noticeTitle}>{title}</p>
        <p className={styles.notcieDate}>{noticeDate}</p>
      </div>
    </div>
  );
};

export default ImageNotice;
