import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../layout/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [uniqueOrganizationCode, setUniqueOrganizationCode] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    try {
      e.preventDefault();

      const newUser = {
        email,
        password,
        passwordCheck,
        uniqueOrganizationCode,
      };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      //&& operator will only execute only if both the  sides are true
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">
          Password<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="register-password">
          Verify Password<span style={{ color: "red" }}>*</span>
        </label>
        <input
          // placeholder="Verify password"
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-uniqueOrganizationCode">
          Unique Organization Code<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="register-uniqueOrganizationCode"
          type="text"
          onChange={(e) => setUniqueOrganizationCode(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
