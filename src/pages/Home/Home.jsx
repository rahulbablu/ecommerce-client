import React from "react";
import Categories from "../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import "./Home.scss";

const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <Slider />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending" />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
