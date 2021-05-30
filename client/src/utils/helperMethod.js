import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageNotice from "../components/layout/image-notice/index";
import PdfNoticeRenderer from "../components/pages/PdfNoticeRenderer";
toast.configure();

export const noticeUploadHandler = ({ title, noticeDate, noticeFile }) => {
  console.log("data:>>", noticeFile);
  if (noticeFile) {
    const noticeFileType = noticeFile.type;
    const types = ["application/pdf", "image/jpeg", "image/png"];
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
          console.log(
            "🚀 ~ file: helperMethod.js ~ line 37 ~ noticeUploadHandler ~ error",
            error
          );
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

export const fetchNotice = (setUploadedNotices, setIsLoading) => {
  setIsLoading(true);
  axios
    .get("http://localhost:5000/notice")
    .then((res) => {
      setUploadedNotices(res.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
};

export const noticeDisplayHandler = (notice) => {
  const { noticeFileType } = notice;

  if (noticeFileType === "application/pdf") {
    return <PdfNoticeRenderer notice={notice} />;
  } else {
    return <ImageNotice notice={notice} />;
  }
};
