import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../global/UserContext";
import Axios from "axios";
import ErrorNotice from "../../layout/ErrorNotice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

toast.configure();
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
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

  const pwdVisibilityChangeHandler = () => {
    const prevState = showPwd;
    setShowPwd(!prevState);
  };

  return (
    <div className={styles.loginFormContainer}>
      {isLoading ? (
        <h3 style={{ position: "absolute", top: 30 }}>
          Loading! Please wait...
        </h3>
      ) : null}
      <div className={styles.imageContainer}>
        <img src="/notice-board-illustrator.png" alt="logo"></img>
      </div>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="login-email">
            Email<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            id="login-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email..."
            readOnly={isLoading}
          />

          <label htmlFor="login-password">
            Password<sup style={{ color: "red" }}>*</sup>
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="login-password"
              placeholder="Enter your password..."
              type={showPwd ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              readOnly={isLoading}
            />
            {password && password.length ? (
              <span onClick={() => pwdVisibilityChangeHandler()}>
                <img
                  src={showPwd ? "/assets/hidepwd.svg" : "/assets/showpwd.svg"}
                  alt="show-password"
                />
              </span>
            ) : null}
          </div>
          <input disabled={isLoading} type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
