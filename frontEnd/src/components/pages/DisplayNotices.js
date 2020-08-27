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
        console.log(res.data);
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
        return (
          <div className="notices-container">
            <SingleNotice key={notice._id} notice={notice} />
          </div>
        );
      })
    ) : (
      <h1>No notice</h1>
    );
  };

  return getContent();
};

export default DisplayNotices;
