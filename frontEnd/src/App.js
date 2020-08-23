import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import UserContext from "./context/UserContext";

import UploadPage from "./components/pages/UploadPage";

import "./style.css";

export default function App() {
  //saves jwt,userdata
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  //check  for whether the user login data is  in the localStorage or not ,
  //even after refresh or closing and opening the tabs the details should be present in the localstorage
  useEffect(() => {
    const checkLoggenIn = async () => {
      //if token is present in the localstorage then get the token otherwise just set the token to empty string
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      //posting data to the backend at /isTokenValid
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggenIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={userData.user ? UploadPage : Home}
              />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
