const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
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
