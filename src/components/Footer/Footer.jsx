import React from "react";
import upi from '../../assets/imgs/upi.png'
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            We provide great quality products at affordable prices.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Available everyday at 9am to 9pm. Feel free to contact.
          </span>
        </div>
      </div>
      <div className="bottom">
       <div className="left">
        <span className="logo">Chowrasta</span>
        <span className="copyright">Copyright 2022. All Rights Reserved</span>
       </div>
       <div className="right">
        <img src={upi} alt='upi' />
       </div>
      </div>
    </div>
  );
};

export default Footer;
