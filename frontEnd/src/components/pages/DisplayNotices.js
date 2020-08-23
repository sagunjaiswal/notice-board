import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleNotice from "./SingleNotice";

const DisplayNotices = () => {
  const [uploadedNotices, setUploadedNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notice")
      .then((res) => {
        setUploadedNotices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Display Notice</h1>
      <SingleNotice uploadedNotices={uploadedNotices} />
    </div>
  );
};

export default DisplayNotices;
