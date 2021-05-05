const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  noticeDate: {
    type: String,
    required: true,
  },
  noticeFile: {
    type: String,
    required: true,
  },
  noticeFileType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notice", noticeSchema);
