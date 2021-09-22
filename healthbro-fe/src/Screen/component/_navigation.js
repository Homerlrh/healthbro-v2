import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function _navigation({ links }) {
  const { email } = useContext(AppContext);
  const history = useHistory();
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

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const userStatus = email ? (
    <nav className="userStatus">
      <a href="/profile">hi {email}</a> |{" "}
      <a style={{ cursor: "pointer" }} onClick={handleLogout}>
        Log Out
      </a>
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
