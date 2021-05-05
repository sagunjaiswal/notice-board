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

  return getContent();
};

export default DisplayNotices;