import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineMail, AiOutlineEye } from "react-icons/ai";
import { AppContext } from "../context/AuthContext";
import { useHistory } from "react-router";
export default function _login() {
  //state variable
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //password type
  const [inputType, setInputType] = useState("password");

  //context
  const context = useContext(AppContext);

  //react router
  const history = useHistory();

  //useEffect for checking wheather the user is login
  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/recipeSearch");
  });

  //login handler
  //onClick get email and password
  const handleLogin = async () => {
    const result = await axios.post("http://localhost:3333/auth/login", {
      email,
      password,
    });

    //get result after posting the data to the api
    //set token and email for the rest of the page to know
    localStorage.setItem("token", result.data.token);
    context.setToken(result.data.token);
    context.setEmail(result.data.email);
  };

  //password type handler
  const showPassword = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <div className="login">
      <h1>LOG IN</h1>
      <div className="userInput">
        <div>
          <span>
            <AiOutlineMail size={30} />
          </span>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="JohnDoe@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>
            <AiOutlineEye onClick={showPassword} size={30} />
          </label>
          <input
            name="password"
            type={inputType}
            value={password}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button className="loginButton" onClick={handleLogin}>
          LOG IN
        </button>
      </div>
      <p className="redirectionLink">
        NEW HERE?<a href="/signUp">&nbsp;SIGN UP HERE</a>
      </p>
    </div>
  );
}
