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
      <p>Loading</p>
    ) : uploadedNotices.length ? (
      // <p>Loaded</p>
      uploadedNotices.map((notice) => {
        return <SingleNotice key={notice._id} notice={notice} />;
      })
    ) : (
      <p>No notice</p>
    );
  };

  return getContent();
};

export default DisplayNotices;
