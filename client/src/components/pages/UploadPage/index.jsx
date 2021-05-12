import React, { useState } from "react";
import moment from "moment";
import { noticeUploadHandler } from "../../../utils/helperMethod";
import NoticeSection from "../DisplayNotice/index";
import styles from "./style.module.css";

const UploadPage = () => {
  const myRef = React.createRef();
  const [title, setTitle] = useState("");
  const [noticeDate, setNoticeDate] = useState(moment().format("YYYY-MM-DD"));
  const [noticeFile, setNoticeFile] = useState(null);
  const [uploadedNotices, setUploadedNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const _onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "noticeDate") {
      setNoticeDate(e.target.value);
    } else {
      setNoticeFile(e.target.files[0]);
    }
  };

  const formDataBundler = () => {
    const dataToBeSent = {
      title: title,
      noticeDate: noticeDate,
      noticeFile: noticeFile,
    };
    console.log("formDataBundler -> dataToBeSent", dataToBeSent);
    return dataToBeSent;
  };

  return (
    <div className={styles.uploadFormContainer}>
      <div className={styles.uploadForm}>
        <div className={styles.inputSection}>
          <input
            type="text"
            name="title"
            placeholder="Notice Title*"
            onChange={(e) => _onChangeHandler(e)}
            style={{ width: "50%" }}
            required
          />
          <input
            type="date"
            name="noticeDate"
            id="noticeDate"
            value={noticeDate}
            max={moment().format("YYYY-MM-DD")}
            onChange={(e) => _onChangeHandler(e)}
          />
        </div>
        <button
          title="Select .pdf/.jpeg/.jpg/.png file"
          name="fileSelector"
          className={styles.selectFileBtn}
          onClick={() => myRef.current.click()}
        >
          Select Notice File
        </button>
        <strong>{noticeFile ? noticeFile.name : null}</strong>
        <input
          ref={myRef}
          type="file"
          accept=".pdf,.jpeg,.jpg,.png"
          id="upload"
          style={{ display: "none" }}
          onChange={(e) => _onChangeHandler(e)}
        />
        <br />
        <button
          className={styles.uploadButton}
          title={
            noticeFile !== null
              ? "Click to upload the file"
              : "Select a notice file"
          }
          name="fileSelector"
          disabled={noticeFile === null ? true : false}
          onClick={() => noticeUploadHandler(formDataBundler())}
        >
          Upload Notice
        </button>
      </div>
      <NoticeSection />
    </div>
  );
};

export default UploadPage;
