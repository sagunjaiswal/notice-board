import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleNotice from "./SingleNotice";

const DisplayNotices = () => {
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

  const noticeRenderer = ({
    noticeFileType,
    noticeFile,
    noticeDate,
    title,
    _id,
  }) => {
    if (noticeFileType === "application/pdf") {
      // return uploadedNotices.length
      // ? uploadedNotices.map((notice) => {
      return (
        <div className="notices-container">
          <SingleNotice
            key={_id}
            notice={(noticeFileType, noticeFile, noticeDate, title, _id)}
          />
        </div>
      );
      // })
      // : null;
    }
    // <a
    //   key={_id}
    //   href={`http://localhost:5000/${noticeFile}`}
    //   rel="noopener noreferrer"
    //   target="_blank"
    // >
    //   <div
    //     style={{
    //       marginTop: 20,
    //       marginBottom: 20,
    //       width: "200px",
    //       display: "inline",
    //     }}
    //   >
    //     <img src="/iconfinder_application-illustrator_8889.png" alt={title} />
    //     <p>{title}</p>
    //     <p>{noticeDate}</p>
    //   </div>
    // </a>
    else {
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

  const getContent = () => {
    return isLoading ? (
      <h1>Loading...</h1>
    ) : uploadedNotices.length ? (
      // uploadedNotices.map((notice) => noticeRenderer(notice))
      uploadedNotices.map((notice) => {
        const { noticeFileType, noticeFile, noticeDate, title, _id } = notice;

        if (noticeFileType === "application/pdf") {
          // return uploadedNotices.length
          // ? uploadedNotices.map((notice) => {
          return (
            <div className="notices-container">
              <SingleNotice key={notice._id} notice={notice} />
            </div>
          );
        } else {
          return (
            <div className="notices-container">
              <a
                key={_id}
                href={`http://localhost:5000/${noticeFile}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div style={{ padding: "80px", paddingTop: "100px" }}>
                  <img
                    src={`http://localhost:5000/${noticeFile}`}
                    alt="imageNotice"
                    height="200px"
                    width="200px"
                  />
                  <p style={{ color: "#6aa051" }}>{title}</p>
                  <p>{noticeDate}</p>
                </div>
              </a>
            </div>
          );
        }
      })
    ) : (
      <h1>No notice</h1>
    );
  };

  return getContent();
};

export default DisplayNotices;
