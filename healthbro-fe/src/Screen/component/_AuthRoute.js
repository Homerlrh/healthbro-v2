import { Route, Redirect } from "react-router-dom";

//authentication route, if the user is login then render route else redirect then back to the home page
export default function _AuthRoute({ component: Component, path }) {
  //conditional render base on token
  return localStorage.getItem("token") ? (
    <Route path={path} component={Component} />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
}
