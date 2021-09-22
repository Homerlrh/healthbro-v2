import { Route, Redirect } from "react-router-dom";

export default function _AuthRoute({ component: Component, path }) {
  return localStorage.getItem("token") ? (
    <Route path={path} component={Component} />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
}
