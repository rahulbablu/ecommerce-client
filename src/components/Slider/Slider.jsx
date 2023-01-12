import React from "react";
import "./Slider.scss";
import banner1 from "../../assets/imgs/banner1.jpg";
import banner2 from "../../assets/imgs/banner2.jpg";
import banner3 from "../../assets/imgs/banner3.gif";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currSlide, setCurrSlide] = useState(0);

  const prevSlide = () => {
    setCurrSlide(currSlide === 0 ? 2 : currSlide - 1);
  };

  const nextSlide = () => {
    setCurrSlide(currSlide === 2 ? 0 : currSlide + 1);
  };

  const data = [banner1, banner2, banner3];
  return (
    <div className="slider">
      <div
        style={{ transform: `translateX(-${currSlide * 100}vw)` }}
        className="container"
      >
        <Link to="/products/6" className="link">
          <img src={data[0]} alt="banner1" />
        </Link>
        <Link to="/products/5" className="link">
          <img src={data[1]} alt="banner2" />
        </Link>
        <Link to="/products/3" className="link">
          <img src={data[2]} alt="banner3" />
        </Link>
      </div>
      <div className="icons">
        <div onClick={prevSlide} className="icon icon-left">
          <WestOutlinedIcon />
        </div>
        <div onClick={nextSlide} className="icon icon-right">
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
