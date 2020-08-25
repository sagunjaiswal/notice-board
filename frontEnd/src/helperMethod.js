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

export const noticeRenderer = (noticeFileType, noticeFile) => {
  if (noticeFileType === "application/pdf") {
    return (
      // <embed
      //   src={`http://localhost:5000/${noticeFile}`}
      //   pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
      //   type="application/pdf"
      //   height="700px"
      //   width="500"
      // />
      //   <iframe
      //     src={`http://docs.google.com/gview?
      // url=http://localhost:5000/${noticeFile}&embedded=true`}
      //     style={{ width: "600px", height: "500px" }}
      //     frameborder="0"
      //   ></iframe>
      <object
        width="400px"
        height="400px"
        data={`http://localhost:5000/${noticeFile}`}
      ></object>
    );
  } else {
    return (
      <iframe
        style={{ display: "inline", marginBottom: 20 }}
        src={`http://localhost:5000/${noticeFile}`}
      ></iframe>
    );
  }
};
