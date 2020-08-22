import axios from "axios";

export const noticeUploadHandler = ({ title, desc, noticeImage }) => {
  console.log("data:>>", title, desc, noticeImage);
  if (noticeImage) {
    const fileType = noticeImage.type;
    const types = ["application/pdf", "image/jpeg"];
    if (types.includes(fileType)) {
      console.log("noticeUploadHandler -> noticeImage", noticeImage);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("noticeImage", noticeImage);
      axios
        .post("http://localhost:5000/notice", formData, config)
        .then((response) => {
          console.log(response);
          alert("YOUR NOTICE IS SUCCESSFULLY SUBMITTED");
          // window.location.reload();
        })
        .catch((error) => {
          alert(
            "DUE TO SOME TECHNICAL ERROR YOUR NOTICE CANNOT BE SUBMITTED AT THE MOMENT"
          );
        });
    } else {
      console.log("Invalid File");
    }
  } else {
    console.log("Please Select a File");
  }
};
