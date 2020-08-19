import React from "react";
import { noticeUploadHandler } from "../../helperMethod";
export default function UploadPage() {
  const myRef = React.createRef();

  return (
    <div className="page">
      <button className="uploadButton" onClick={() => myRef.current.click()}>
        UPLOAD NOTICE
      </button>
      <input
        ref={myRef}
        type="file"
        accept=".pdf,.jpeg"
        id="upload"
        style={{ display: "none" }}
        onChange={(e) => noticeUploadHandler(e)}
      />
    </div>
  );
}
