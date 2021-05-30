import React, { useContext } from "react";
import UserContext from "../../../global/UserContext";
import DisplayNotices from "../DisplayNotice/index";
import UploadPage from "../UploadPage/index";
import styles from "./styles.module.css";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className={styles.page}>
      {userData.user ? (
        <UploadPage />
      ) : (
        <div className={styles.noticeContainer}>
          <DisplayNotices />
        </div>
      )}
    </div>
  );
}
