import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import * as Screen from "./Screen";
import { Header, Footer, NavBar } from "./Screen/component";

function App() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Header />
      <NavBar
        links={[
          { link: "", name: "Home" },
          { link: "login", name: "About" },
          { link: "signUp", name: "Plans" },
        ]}
      />
      <Switch>
        <Route path="/" exact component={Screen.Dashboard} />
        <Route path="/login" component={Screen.Login} />
        <Route path="/signUp" component={Screen.SignUp} />
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
