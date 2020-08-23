import React, { useState, useEffect } from "react";
import { noticeUploadHandler } from "../../helperMethod";
import SingleNotice from "./SingleNotice";
import axios from "axios";

export default function UploadPage() {
  const myRef = React.createRef();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [noticeImage, setNoticeImage] = useState(null);
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
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "desc") {
      setDesc(value);
    } else {
      setNoticeImage(e.target.files[0]);
    }
  };
  const formDataBundler = () => {
    const dataToBeSent = { title: title, desc: desc, noticeImage: noticeImage };
    // setTitle("");
    // setDesc("");
    // setNoticeImage(null);
    return dataToBeSent;
  };
  return (
    <div className="page">
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
        type="text"
        name="desc"
        id="desc"
        placeholder="Description"
        onChange={(e) => _onChangeHandler(e)}
        required
      />
      <br />
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
        onClick={() => noticeUploadHandler(formDataBundler())}
      >
        Upload Notice{" "}
      </button>
      <br />
      <SingleNotice uploadedNotices={uploadedNotices} />
    </div>
  );
}
