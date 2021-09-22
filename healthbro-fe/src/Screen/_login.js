import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineMail, AiOutlineEye } from "react-icons/ai";
import { AppContext } from "../context/AuthContext";
import { useHistory } from "react-router";
export default function _login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const context = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/recipeSearch");
  }, []);

  const handleLogin = async () => {
    const result = await axios.post("http://localhost:3333/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", result.data.token);
    context.setToken(result.data.token);
    context.setEmail(result.data.email);
  };

  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
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
