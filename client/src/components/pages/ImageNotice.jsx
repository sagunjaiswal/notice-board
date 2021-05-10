import React from "react";

const ImageNotice = ({ notice }) => {
  const { _id, noticeFile, title, noticeDate } = notice;

  return (
    <div key={_id} style={{ padding: "80px", paddingTop: "100px" }}>
      <a
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
  );
};

export default ImageNotice;
