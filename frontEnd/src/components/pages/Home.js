import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import DisplayNotices from "./DisplayNotices";
import UploadPage from "./UploadPage";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      <p>Home for Students...</p>
      {userData.user ? <UploadPage /> : <DisplayNotices />}
    </div>
  );
}
