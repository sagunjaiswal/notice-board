import React, { useEffect, useState } from "react";
import { noticeRenderer } from "../../helperMethod";

const SingleNotice = ({ notice }) => {
  return (
    <div key={notice._id}>
      {noticeRenderer(notice.noticeFileType, notice.noticeFile)}
    </div>
  );
};

export default SingleNotice;
