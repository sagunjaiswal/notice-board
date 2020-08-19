import axios from "axios";

export const noticeUploadHandler = (e) => {
  const noticeFile = e.target.files[0];
  const fileType = noticeFile.type;
  const types = ["application/pdf", "image/jpeg"];
  if (types.includes(fileType)) {
    console.log("noticeUploadHandler -> noticeFile", noticeFile);
    axios
      .post()
      .then((response) => {
        console.log(response);
        alert("YOUR NOTICE IS SUCCESSFULLY SUBMITTED");
      })
      .catch((error) => {
        alert(
          "DUE TO SOME TECHNICAL ERROR YOUR NOTICE CANNOT BE SUBMITTED AT THE MOMENT"
        );
      });
  } else {
    console.log("Invalid File");
  }
};
