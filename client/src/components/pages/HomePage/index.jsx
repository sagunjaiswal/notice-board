import React, { useContext } from "react";
import UserContext from "../../../global/UserContext";
import DisplayNotices from "../DisplayNotice/index";
import UploadPage from "../UploadPage/index";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? null : (
        <p style={{ color: "red", fontSize: "smaller" }}>
          Only faculty members can register or login for uploading the notice...
        </p>
      )}

      {userData.user ? (
        <UploadPage />
      ) : (
        <div className="notices-container">
          <DisplayNotices />
        </div>
      )}
    </div>
  );
}
