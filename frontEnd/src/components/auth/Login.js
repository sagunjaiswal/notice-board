import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../layout/ErrorNotice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      const notifySuccess = () => {
        toast.info("YEYYYY! You have logged in successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      };
      if (userData) notifySuccess();
      history.push("/");
    } catch (err) {
      //&& operator will only execute only if both the  sides are true
      err.response.data.msg && setError(err.response.data.msg);
      const notifyError = () => {
        toast.error("LOGIN FAILED", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      };
      if (userData) notifyError();
    }
  };

  return (
    <div className="page">
      <div className="login-register-form">
        <h2>Login</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="login-email">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="login-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="login-password">
            Password<span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="login-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
