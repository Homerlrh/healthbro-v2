import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

export const AppContext = createContext();

const AuthContext = ({ children }) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, data) => {
        if (err) {
          return console.log(err.message);
        }
        setEmail(data.email);
      });
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ email, setEmail, setToken }}>
      <BrowserRouter>{children}</BrowserRouter>
    </AppContext.Provider>
  );
};

export default AuthContext;
