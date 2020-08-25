import React, { useState, useEffect } from "react";
import { noticeUploadHandler, noticeRenderer } from "../../helperMethod";
import SingleNotice from "./SingleNotice";
import axios from "axios";
import moment from "moment";

export default function UploadPage() {
  const myRef = React.createRef();
  const [title, setTitle] = useState("");
  const [noticeDate, setNoticeDate] = useState(moment().format("YYYY-MM-DD"));
  const [noticeFile, setNoticeFile] = useState(null);
  const [uploadedNotices, setUploadedNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notice")
      .then((res) => {
        setUploadedNotices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    <div className="page">
      <div className="upload-form">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => _onChangeHandler(e)}
          required
        />
        <br />
        <input
          type="date"
          name="noticeDate"
          id="noticeDate"
          value={noticeDate}
          max={moment().format("YYYY-MM-DD")}
          onChange={(e) => _onChangeHandler(e)}
        />
        <br />
        <button
          className="selectFileBtn"
          name="fileSelector"
          onClick={() => myRef.current.click()}
        >
          Select Notice File
        </button>
        <strong>{noticeFile ? noticeFile.name : null}</strong>
        <input
          ref={myRef}
          type="file"
          accept=".pdf,.jpeg"
          id="upload"
          style={{ display: "none" }}
          onChange={(e) => _onChangeHandler(e)}
        />
        <br />
        <button
          className="uploadButton"
          name="fileSelector"
          onClick={() => noticeUploadHandler(formDataBundler())}
        >
          Upload Notice
        </button>
      </div>
      <br />
      {uploadedNotices.length ? (
        uploadedNotices.map((notice) => noticeRenderer(notice))
      ) : (
        <h1>Loading notices...</h1>
      )}
    </div>
  );
}
