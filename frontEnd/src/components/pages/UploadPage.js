import React, { useState, useEffect } from "react";
import { noticeUploadHandler } from "../../helperMethod";
import SingleNotice from "./SingleNotice";
import axios from "axios";
import moment from "moment";

export default function UploadPage() {
  const myRef = React.createRef();

  const [title, setTitle] = useState("");
  const [noticeDate, setNoticeDate] = useState(moment().format("YYYY-MM-DD"));
  const [noticeFile, setNoticeFile] = useState(null);
  const [uploadedNotices, setUploadedNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notice")
      .then((res) => {
        setUploadedNotices(res.data);
        setIsLoading(false);
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

  const getContent = () => {
    return isLoading ? (
      <h1>Loading...</h1>
    ) : uploadedNotices.length ? (
      uploadedNotices.map((notice) => {
        const { noticeFileType, noticeFile, noticeDate, title, _id } = notice;

        if (noticeFileType === "application/pdf") {
          return (
            <div className="notices-container">
              <SingleNotice key={notice._id} notice={notice} />
            </div>
          );
        } else {
          return (
            <div className="notices-container">
              <div style={{ padding: "80px", paddingTop: "100px" }}>
                <a
                  key={_id}
                  href={`http://localhost:5000/${noticeFile}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={`http://localhost:5000/${noticeFile}`}
                    alt="imageNotice"
                    height="260px"
                    width="200px"
                  />
                </a>
                <p style={{ color: "#6aa051" }}>{title}</p>
                <p>{noticeDate}</p>
              </div>
            </div>
          );
        }
      })
    ) : (
      <h1>No notice</h1>
    );
  };

  return (
    <div className="page">
      <div className="upload-form">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Notice Title*"
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
          accept=".pdf,.jpeg,.jpg,.png"
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
      {getContent()}
    </div>
  );
}
