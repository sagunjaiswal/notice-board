import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import { fetchNotice, noticeDisplayHandler } from "../../../utils/helperMethod";
import PdfNoticeRenderer from "../PdfNoticeRenderer";
import UserContext from "../../../global/UserContext";

const DisplayNotices = () => {
  const [uploadedNotices, setUploadedNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    fetchNotice(setUploadedNotices, setIsLoading);
  }, []);

  return (
    <>
      {userData.user ? (
        <div className={styles.notices}>
          {isLoading ? (
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
          )}
        </div>
      ) : (
        <>
          <div className={styles.leftChild}>
            <img className={styles.leftChildImg} src="vector-creator.png" />
          </div>
          <div className={styles.rightChild}>
            {isLoading ? (
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
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayNotices;
