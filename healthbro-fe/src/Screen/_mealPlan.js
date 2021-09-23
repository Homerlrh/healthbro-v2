import React, { useState, useContext } from "react";
import { AppContext } from "../context/AuthContext";
import { Card } from "./component";
import { BsSearch } from "react-icons/bs";

//generate mealplan for the day
//generate mealplan with user's target calories a day
export default function _mealPlan() {
  //states variable
  const [calorie, setcalorie] = useState("");
  const [mealPlan, setMealPlan] = useState([]);

  //context
  const { apiCaller } = useContext(AppContext);

  //handle api calling
  const handleSearch = async () => {
    const result = await apiCaller.post("http://localhost:3333/api/mealPlan", {
      targetCalories: calorie,
    });
    setMealPlan(result.data);
  };

  //construct component
  const plan = mealPlan.map((ele, i) => (
    <div className="s" key={i}>
      <Card recipe={ele} />
    </div>
  ));

  return (
    <div className="recipeSearch">
      <div className="mealPlanner">
        <h1>Meal Planner</h1>
        <div className="inputArea">
          <label>Today's Target calorie</label>
          <section>
            <input
              name="targetcalorie"
              type="text"
              value={calorie}
              onChange={(e) => setcalorie(e.target.value)}
            />
            <div className="searchButton" onClick={handleSearch}>
              <BsSearch size={30} />
            </div>
          </section>
        </div>
      </div>
      <div className="recipesDisplayArea">{plan}</div>
    </div>
  );
}
