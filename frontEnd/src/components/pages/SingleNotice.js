import React from "react";
import { noticeRenderer } from "../../helperMethod";

const SingleNotice = ({ notice }) => {
  return noticeRenderer(notice);
};

export default SingleNotice;
