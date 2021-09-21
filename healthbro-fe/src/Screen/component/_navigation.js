import React from "react";
import { NavLink } from "react-router-dom";

export default function _navigation({ links }) {
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
  return (
    <div className="navBar">
      <div></div>
      <div>{linkGroup}</div>
      <div>
        <nav className="userStatus">
          <a href="/signUp" style={{ marginRight: 10 }}>
            sign Up
          </a>
          <a href="/login">Login</a>
        </nav>
      </div>
    </div>
  );
}
