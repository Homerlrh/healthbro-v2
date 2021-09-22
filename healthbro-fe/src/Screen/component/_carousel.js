import React from "react";
import Slider from "react-slick";
import Card from "./_card";
export default function _carousel({ post }) {
  const settings = {
    className: "abc",
    centerMode: true,
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 1,
    focusOnSelect: true,
    speed: 500,
    variableWidth: true,
    variableHeight: true,
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

  const cardGrp = post.map((ele, i) => (
    <div className="s" key={i}>
      <Card
        imgUrl={ele.image}
        recipeName={ele.title}
        description={ele.summary}
        servings={ele.servings}
        readyInMinuted={ele.readyInMinutes}
      />
    </div>
  ));
  return (
    <div style={{ boxSizing: "border-box" }}>
      <Slider {...settings}>{cardGrp}</Slider>
    </div>
  );
}
