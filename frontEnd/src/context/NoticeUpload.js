import React from 'react';
import axios from "axios";

function NoticeUpload() {

const uploadNotice = () => {
    axios.post().then((response) => {
        console.log(response);
        alert("YOUR NOTICE IS SUCCESSFULLY SUBMITTED");
      })
      .catch((error) => {
        alert(
          "DUE TO SOME TECHNICAL ERROR YOUR NOTICE CANNOT BE SUBMITTED AT THE MOMENT"
        );
    });
    }

    return (
        <div>
            
        </div>
    );
}

export default NoticeUpload;

