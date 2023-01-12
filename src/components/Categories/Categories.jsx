import React from "react";
import "./Categories.scss";
import men from "../../assets/Categories/men.jpg";
import women from "../../assets/Categories/women.jpg";
import sale from "../../assets/Categories/sale.jpg";
import season from "../../assets/Categories/season.jpg";
import footwear from "../../assets/Categories/footwear.jpg";
import accessories from "../../assets/Categories/accessories.jpg";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="item1 item">
        <img src={sale} alt="sale" />
        <button>
          <Link to="/products/6" className="link">
            Sale
          </Link>
        </button>
      </div>
      <div className="item2 item">
        <img src={season} alt="season" />
        <button>
          <Link to="/products/5" className="link">
            New Season
          </Link>
        </button>
      </div>
      <div className="item3 item">
        <img src={women} alt="women" />
        <button>
          <Link to="/products/2" className="link">
            Women
          </Link>
        </button>
      </div>
      <div className="item4 item">
        <img src={men} alt="men" />
        <button>
          <Link to="/products/1" className="link">
            Men
          </Link>
        </button>
      </div>
      <div className="item5 item">
        <img src={accessories} alt="accessories" />
        <button>
          <Link to="/products/4" className="link">
            Accessories
          </Link>
        </button>
      </div>
      <div className="item6 item">
        <img src={footwear} alt="footwear" />
        <button>
          <Link to="/products/3" className="link">
            Footwear
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Categories;
