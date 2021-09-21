import React, { useState } from "react";
import axios from "axios";
import upperBackground from "../assest/pictures/upperBackground.svg";
import cookingHand from "../assest/pictures/cookingHand.svg";
import Slider from "react-slick";
export default function _dashboard() {
  const settings = {
    className: "abc",
    centerMode: true,
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 1,
    focusOnSelect: true,
    speed: 500,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
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
          <a>Start Searching</a>
        </div>
        <img src={cookingHand} />
      </div>
      <div className="dashboardLower">
        <div style={{ boxSizing: "border-box" }}>
          <Slider {...settings}>
            <div className="s">
              <div
                class="slide"
                style={{
                  backgroundColor: "red",
                }}
              >
                1
              </div>
            </div>
            <div className="s">
              <div class="slide" style={{ backgroundColor: "green" }}>
                2
              </div>
            </div>
            <div className="s">
              <div class="slide" style={{ backgroundColor: "blue" }}>
                3
              </div>
            </div>
            <div className="s">
              <div class="slide" style={{ backgroundColor: "pink" }}>
                4
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}
