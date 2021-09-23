import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";

//export context for other pages to use
export const AppContext = createContext();

const AuthContext = ({ children }) => {
  //state variables
  const [email, setEmail] = useState("");
  //user status persit
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // Set config defaults when creating the instance
  // Creadt api caller with token added
  // will be use when calling api that require login(token)
  const apiCaller = axios.create({
    baseURL: "http://localhost:3333",
    headers: { Authorization: token },
  });

  //useEffect hook for keeping user login status persit
  //hook will run when setToken or token has changed
  useEffect(() => {
    //if the localStorage have token, then decode the token and set email
    if (localStorage.getItem("token")) {
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, data) => {
        if (err) {
          return console.log(err.message);
        }
        setEmail(data.email);
      });
    }
  }, [setToken, token]);

  //provide context wrapper for app to use
  return (
    <AppContext.Provider
      value={{ email, setEmail, token, setToken, apiCaller }}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </AppContext.Provider>
  );
};

export default AuthContext;
