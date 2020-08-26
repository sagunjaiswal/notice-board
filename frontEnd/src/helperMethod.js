import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
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
          const notify = () => {
            toast.info("YEYY! YOUR NOTICE IS SUBMITTED SUCCESSFULLY", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            });
          };
          notify();
          window.location.reload();
        })
        .catch((error) => {
          const notify = () => {
            toast(
              "DUE TO SOME TECHNICAL ERROR WE COULDNT UPLOAD YOUR NOTICE(make sure all the fields are filled), try again later...",
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
              }
            );
          };
          notify();
        });
    } else {
      const notify = () => {
        toast(
          "INVALID FILE TYPE, (the allowed file formats are .pdf, .jpg and .png only)",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          }
        );
      };
      notify();
    }
  } else {
    const notify = () => {
      toast("Please select a file", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    };
    notify();
  }
};

export const noticeRenderer = ({
  noticeFileType,
  noticeFile,
  noticeDate,
  title,
  _id,
}) => {
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
          <p>{noticeDate}</p>
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
