import React, { useState, useEffect } from "react";
import axios from "axios";
import upperBackground from "../assest/pictures/upperBackground.svg";
import cookingHand from "../assest/pictures/cookingHand.svg";
import { Carousel } from "./component";
import { useHistory } from "react-router-dom";

export default function _dashboard() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getData() {
      const recipes = await axios.get(`http://localhost:3333/api/random`, {
        params: {
          numberOfRecipes: 3,
        },
      });
      setPosts(recipes.data.recipes);
    }
    getData();
  }, [setPosts]);

  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    token ? history.push("/recipeSearch") : history.push("/signUp");
  };

  return (
    <section className="container">
      <div
        className="dashboardUpper"
        style={{ backgroundImage: `url(${upperBackground})` }}
      >
        <div>
          <p>
            HealthBro provides you with a simple way to find different receipes
            based upon your needs.
          </p>
          <br />
          <a onClick={handleRedirect}>Start Searching</a>
        </div>
        <img src={cookingHand} alt="cookingHand" />
      </div>
      <div className="dashboardLower">
        {posts.length > 0 ? <Carousel post={posts} /> : <></>}
      </div>
    </section>
  );
}
