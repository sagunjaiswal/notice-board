import React from "react";
import NoticeUpload from "../../context/NoticeUpload";
export default function UploadPage() {
  const myRef = React.createRef();

  const noticeUploadHandler = (e) => {
    const noticeFile = e.target.files[0];
    console.log("noticeUploadHandler -> noticeFile", noticeFile);
  };
  return (
    <div className="page">
      <button className="uploadButton" onClick={() => myRef.current.click()}>
        UPLOAD NOTICE
      </button>
      <input
        ref={myRef}
        type="file"
        accept=".pdf,.jpg,.jpeg"
        id="upload"
        style={{ display: "none" }}
        onChange={(e) => noticeUploadHandler(e)}
      />
    </div>
  );
}
