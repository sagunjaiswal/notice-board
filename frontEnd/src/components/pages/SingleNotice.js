import React from "react";

function SingleNotice(props) {
  return (
    <div>
      {props.uploadedNotices.length ? (
        props.uploadedNotices.map((notice) => (
          <div key={notice._id}>
            <img
              src={`http://localhost:5000/${notice.noticeImage}`}
              alt="notice image"
            />
            <h6>{notice.title}</h6>
            <p>{notice.desc}</p>
          </div>
        ))
      ) : (
        // <Spinner role="grow" />
        <h1>Loading Notice...</h1>
      )}
    </div>
  );
}

export default SingleNotice;
