import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineMail, AiOutlineEye } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { AppContext } from "../context/AuthContext";
import { useHistory } from "react-router";

export default function _signUp() {
  //state variable
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  //signUp handler
  //onClick send a post request to the api
  const handleSignUp = async () => {
    //if the comfirm password input equal to the password input then do the rest, else do nothing
    if (confirmPassword === password) {
      const body = {
        name: userName,
        email,
        password,
      };

      const result = await axios.post(
        "http://localhost:3333/auth/signUp",
        body
      );

      //get result after posting the data to the api
      //set token and email for the rest of the page to know
      localStorage.setItem("token", result.data.token);
      context.setEmail(result.data.email);
    }
  };

  //password type handler
  const showPassword = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <div className="signUp">
      <h1>SIGN UP</h1>
      <div className="userInput">
        <div>
          <span>
            <BsPerson size={30} />
          </span>
          <input
            name="userName"
            type="text"
            placeholder="John Doe"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <span>
            <AiOutlineMail size={30} />
          </span>
          <input
            name="email"
            type="email"
            placeholder="JohnDoe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="userInput">
        <div>
          <label>
            <AiOutlineEye size={30} onClick={showPassword} />
          </label>

          {/* conditional render classname base on password type */}
          <input
            className={
              password && confirmPassword && confirmPassword === password
                ? "passwordCheck"
                : "passwordNotMatch"
            }
            name="password"
            type={inputType}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <AiOutlineEye size={30} onClick={showPassword} />
          </label>
          <input
            className={
              password && confirmPassword && confirmPassword === password
                ? "passwordCheck"
                : "passwordNotMatch"
            }
            name="confirmPassword"
            type={inputType}
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <button className="loginButton" onClick={handleSignUp}>
          SIGN UP
        </button>
      </div>
      <p className="redirectionLink">
        Already An User?<a href="/login">&nbsp;LOGIN HERE</a>
      </p>
    </div>
  );
}
