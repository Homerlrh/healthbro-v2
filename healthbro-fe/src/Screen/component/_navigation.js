import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function _navigation({ links }) {
  //context
  const { email, setEmail, setToken } = useContext(AppContext);

  //react router
  const history = useHistory();

  //handle logout function
  const handleLogout = () => {
    //clear the localStorage
    localStorage.clear();

    //set the token and email to be null after the localStorage is clear
    setEmail("");
    setToken("");

    //redirect the page back to homepage
    history.push("/");
  };

  //generate navgation bar base on the data pass front the parent
  const linkGroup = links.map((ele, i) => (
    <NavLink
      key={i}
      className="inActive"
      activeClassName="activeNav"
      exact
      to={`/${ele.link}`}
    >
      {ele.name}
    </NavLink>
  ));

  //conditional render base on whether the user login
  const userStatus = email ? (
    <nav className="userStatus">
      <a href="/profile">hi {email}</a> |{" "}
      <span
        className="logoutButton"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        Log Out
      </span>
    </nav>
  ) : (
    <nav className="userStatus">
      <a href="/signUp" style={{ marginRight: 10 }}>
        sign Up
      </a>
      <a href="/login">Login</a>
    </nav>
  );

  return (
    <div className="navBar">
      <div></div>
      <div>
        <div>{linkGroup}</div>
      </div>
      <div>{userStatus}</div>
    </div>
  );
}
