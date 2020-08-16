import React from "react";

function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <button onClick={props.clearError}></button>
    </div>
  );
}

export default ErrorNotice;
