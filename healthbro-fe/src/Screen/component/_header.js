import React from "react";

export default function _header() {
  const images = importAll(
    require.context("../../assest/pictures/", false, /headerPic[\d].svg$/)
  );
  function importAll(r) {
    return r.keys().map(r);
  }

  return (
    <div
      className="headerBg"
      style={{
        backgroundImage: `url(${
          images[Math.floor(Math.random() * images.length)].default
        })`,
      }}
    >
      <header>
        <strong>Heath</strong>Bro
      </header>
    </div>
  );
}
