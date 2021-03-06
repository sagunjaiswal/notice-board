const router = require("express").Router();
const notice = require("../models/NoticeModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //accept
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    //reject
    cb(new Error("Invalid File type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

//@desc:route for fetching all the post
router.get("/", async (req, res) => {
  try {
    const notices = await notice.find();
    res.send(notices);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Posting Notice
router.post("/", upload.single("noticeFile"), async (req, res) => {
  const newNotice = new notice({
    title: req.body.title,
    noticeDate: req.body.noticeDate,
    noticeFile: req.file.path,
    noticeFileType: req.file.mimetype,
  });
  try {
    const notice = await newNotice.save();
    res.send(notice);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const notices = await notice.find();
    res.send(notices);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
