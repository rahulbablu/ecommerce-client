import React from "react";
import "./Products.scss";
import List from "../../components/List/List";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Products = () => {
  const catId = parseInt(useParams().id);

  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  const { data } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const resetFilters = () => {
    setMaxPrice(100000);
    setSelectedSubCats([]);
    setSort('asc');
    setOpenFilters(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const exists = e.target.checked;

    setSelectedSubCats(
      exists
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    if (window.innerWidth < 900) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="products">
        <div className="left">
          <div className="filterItem cats">
            <h2>Categories</h2>
            {data?.map((item) => (
              <div className="inputItem" key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))}
          </div>
          <div className="filterItem">
            <h2>Price</h2>
            <div className="inputItem">
              <input
                type="radio"
                id={maxPrice}
                value={maxPrice}
                name="rate"
                onChange={(e) => setMaxPrice(500)}
              />
              <label htmlFor={maxPrice}>Below 500</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id={maxPrice}
                value={maxPrice}
                name="rate"
                onChange={(e) => setMaxPrice(1000)}
              />
              <label htmlFor={maxPrice}>Below 1000</label>
            </div>
            <div className="inputItem">
                <input
                  type="radio"
                  id={maxPrice}
                  value={maxPrice}
                  name="rate"
                  onChange={(e) => setMaxPrice(1500)}
                />
                <label htmlFor={maxPrice}>Below 1500</label>
              </div>
            <div className="inputItem">
              <input
                type="radio"
                id={maxPrice}
                value={maxPrice}
                name="rate"
                onChange={(e) => setMaxPrice(2000)}
              />
              <label htmlFor={maxPrice}>Below 2000</label>
            </div>
          </div>
          <div className="filterItem">
            <h2>Sort</h2>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
          <div className="resetFilters" onClick={resetFilters}><span>Reset Filters</span></div>
        </div>
        <div className="right">
          <h1>Flat 30 To 60% Off</h1>
          <div>
            {mobile && (
              <FilterAltIcon
                className="filterIcon"
                onClick={() => setOpenFilters(true)}
              />
            )}
            <List
              catId={catId}
              maxPrice={maxPrice}
              sort={sort}
              subCats={selectedSubCats}
            />
          </div>
        </div>

        {openFilters && (
          <div className="mobileFilters">
            <div className="filterHead">
              <h3>FILTERS</h3>
              <CloseIcon
                style={{ color: "red" }}
                onClick={() => setOpenFilters(false)}
              />
            </div>
            <div className="catFilter">
              <h2>Categories</h2>
              {data.map(item => (
                <div className="inputItem" key={item.id}>
                <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    onChange={handleChange}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
              ))}
            </div>
            <div className="priceFilter">
              <h2>Price</h2>
              <div className="inputItem">
                <input
                  type="radio"
                  id={maxPrice}
                  value={maxPrice}
                  name="rate"
                  onChange={(e) => setMaxPrice(500)}
                />
                <label htmlFor={maxPrice}>Below 500</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id={maxPrice}
                  value={maxPrice}
                  name="rate"
                  onChange={(e) => setMaxPrice(1000)}
                />
                <label htmlFor={maxPrice}>Below 1000</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id={maxPrice}
                  value={maxPrice}
                  name="rate"
                  onChange={(e) => setMaxPrice(1500)}
                />
                <label htmlFor={maxPrice}>Below 1500</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id={maxPrice}
                  value={maxPrice}
                  name="rate"
                  onChange={(e) => setMaxPrice(2000)}
                />
                <label htmlFor={maxPrice}>Below 2000</label>
              </div>
            </div>
            <div className="sortFilter">
              <h2>Sort</h2>
              <div className="inputItem">
                <input
                  type="radio"
                  id="asc"
                  value="asc"
                  name="price"
                  onChange={(e) => setSort("asc")}
                />
                <label htmlFor="asc">Price (Lowest first)</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={(e) => setSort("desc")}
                />
                <label htmlFor="desc">Price (Highest first)</label>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer className="footer" />
    </>
  );
};

export default Products;
