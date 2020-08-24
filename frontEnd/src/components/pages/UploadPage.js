import React, { useState, useEffect } from "react";
import { noticeUploadHandler, noticeRenderer } from "../../helperMethod";
import SingleNotice from "./SingleNotice";
import axios from "axios";

export default function UploadPage() {
  const myRef = React.createRef();
  const [noticeFile, setNoticeFile] = useState(null);
  console.log("UploadPage -> noticeFile", noticeFile);
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
    setNoticeFile(e.target.files[0]);
  };

  return (
    <div className="page">
      <button
        className="uploadButton"
        name="fileSelector"
        onClick={() => myRef.current.click()}
      >
        Select Notice Image
      </button>
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
        onClick={() => noticeUploadHandler(noticeFile)}
      >
        Upload Notice{" "}
      </button>
      <br />
      <div style={{ marginTop: 20 }}>
        {uploadedNotices.length ? (
          uploadedNotices.map((notice) => (
            <div key={notice._id}>
              {noticeRenderer(notice.noticeFileType, notice.noticeFile)}
            </div>
          ))
        ) : (
          <p>No notice</p>
        )}
      </div>
    </div>
  );
}
