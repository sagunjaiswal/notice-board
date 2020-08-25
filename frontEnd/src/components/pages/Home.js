import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import DisplayNotices from "./DisplayNotices";
import UploadPage from "./UploadPage";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? null : (
        <p>
          Only faculty members can register or login for uploading the notice...
        </p>
      )}

      {userData.user ? <UploadPage /> : <DisplayNotices />}
    </div>
  );
}
