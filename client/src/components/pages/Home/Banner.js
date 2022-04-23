import React from "react";
import "./Banner.css";
import image from "../../../images/about.png";
const Banner = () => {
  return (
    <>
      <section className="banner" id="banner_id">
        <h1>Hi! I'M SHUDIPTO</h1>
        <img src={image} alt="Shudipto" />
        <h4>An Expert MERN Stack Developer</h4>
      </section>
    </>
  );
};

export default Banner;
