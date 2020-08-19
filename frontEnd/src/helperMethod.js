export const noticeUploadHandler = (e) => {
  const noticeFile = e.target.files[0];
  const fileType = noticeFile.type;
  const types = ["application/pdf", "image/jpeg"];
  if (types.includes(fileType)) {
    console.log("noticeUploadHandler -> noticeFile", noticeFile);
  } else {
    console.log("Invalid File");
  }
};
