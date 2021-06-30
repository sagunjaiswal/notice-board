import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../global/UserContext";
import Axios from "axios";
import ErrorNotice from "../../layout/ErrorNotice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
toast.configure();

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [uniqueOrganizationCode, setUniqueOrganizationCode] = useState();
  const [error, setError] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  //sending the inputted register data to the backend
  const submit = async (e) => {
    try {
      e.preventDefault();

      const newUser = {
        email,
        password,
        passwordCheck,
        uniqueOrganizationCode,
      };
      //posting register data
      await Axios.post("http://localhost:5000/users/register", newUser);

      //to get the auth token which we get with login
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      //the response is set in the context that the registered user is logged in
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      //store the same token in our local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      const notifySuccess = () => {
        toast.info("YEYYYY! You have registered successfully", {
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
        toast.error("REGISTRATION FAILED", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      };
      if (userData) notifyError();
    }
  };
  //change the password visibility state
  const pwdVisibilityChangeHandler = () => {
    const prevState = showPwd;
    setShowPwd(!prevState);
  };

  return (
    <div className={styles.registrationFormContainer}>
      <div className={styles.imageContainer}>
        <img src="/NavLogo.svg" alt="logo"></img>
      </div>
      <div className={styles.regForm}>
        <h2>Register</h2>

        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="register-email">
            Email<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="register-password">
            Password<sup style={{ color: "red" }}>*</sup>
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="register-password"
              type={showPwd ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
          <label htmlFor="register-password">
            Verify Password<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            // placeholder="Verify password"
            type="password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <label htmlFor="register-uniqueOrganizationCode">
            Unique Organization Code<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            id="register-uniqueOrganizationCode"
            autoComplete="off"
            type="text"
            onChange={(e) => setUniqueOrganizationCode(e.target.value)}
          />

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}
