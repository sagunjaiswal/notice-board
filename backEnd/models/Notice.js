const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  noticeImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notice", noticeSchema);
