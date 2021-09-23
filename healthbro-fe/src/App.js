import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import * as Screen from "./Screen";
import { Header, Footer, NavBar, AuthRoute } from "./Screen/component";
import { useContext } from "react";
import { AppContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AppContext);
  const liinks = token
    ? [
        { link: "", name: "Home" },
        { link: "recipeSearch", name: "Recipe" },
        { link: "mealPlan", name: "Meal Plan" },
        { link: "favourite", name: "Saved" },
      ]
    : [
        { link: "", name: "Home" },
        { link: "login", name: "About" },
        { link: "signUp", name: "Plans" },
      ];
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Header />
      <NavBar links={liinks} />
      <Switch>
        <Route path="/" exact component={Screen.Dashboard} />
        <Route path="/login" component={Screen.Login} />
        <Route path="/signUp" component={Screen.SignUp} />
        <AuthRoute path="/recipeSearch" component={Screen.RecipeSearch} />
        <AuthRoute path="/mealPlan" component={Screen.MealPlan} />
        <AuthRoute path="/favourite" component={Screen.Favourite} />
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
