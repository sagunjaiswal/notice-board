import axios from "axios";
import React from "react";

export const noticeUploadHandler = ({ title, noticeDate, noticeFile }) => {
  console.log("data:>>", noticeFile);
  if (noticeFile) {
    const noticeFileType = noticeFile.type;
    const types = ["application/pdf", "image/jpeg"];
    if (types.includes(noticeFileType)) {
      console.log("noticeUploadHandler -> noticeFile", noticeFile);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("noticeDate", noticeDate);
      formData.append("noticeFile", noticeFile);
      formData.append("noticeFileType", noticeFileType);
      console.log("noticeUploadHandler -> formData", formData);
      axios
        .post("http://localhost:5000/notice", formData, config)
        .then((response) => {
          console.log(response);
          alert("YOUR NOTICE IS SUCCESSFULLY SUBMITTED");
          window.location.reload();
        })
        .catch((error) => {
          alert(
            "DUE TO SOME TECHNICAL ERROR YOUR NOTICE CANNOT BE SUBMITTED AT THE MOMENT"
          );
        });
    } else {
      alert("Invalid File");
    }
  } else {
    alert("Please Select a File");
  }
};

export const noticeRenderer = ({ noticeFileType, noticeFile, title, _id }) => {
  if (noticeFileType === "application/pdf") {
    return (
      <a
        key={_id}
        href={`http://localhost:5000/${noticeFile}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "200px",
            display: "inline",
          }}
        >
          <img src="/iconfinder_application-illustrator_8889.png" alt={title} />
          <p>{title}</p>
        </div>
      </a>
    );
  } else {
    return (
      <a
        key={_id}
        href={`http://localhost:5000/${noticeFile}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "200px",
            display: "inline",
          }}
        >
          <img src="/icons8-noticeboard-96.png" alt="imageNotice" />
          <p>{title}</p>
        </div>
      </a>
    );
  }
};
