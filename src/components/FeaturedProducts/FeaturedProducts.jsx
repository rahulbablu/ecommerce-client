import React, { useEffect, useRef, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const ref = useRef(null);

  const scroll = (val) => {
    ref.current.scrollLeft += val;

    setscrollX(scrollX + val);

    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //This will check scroll event and checks for scroll end
  const scrollCheck = () => {
    setscrollX(ref.current.scrollLeft);
    if (
      Math.ceil(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  useEffect(() => {
    //Check width of the scollings
    if (
      ref.current &&
      ref?.current?.scrollWidth === ref?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => {};
  }, [ref?.current?.scrollWidth, ref?.current?.offsetWidth]);

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Buy our {type} products at jaw-dropping discounts upto 30 to 50% off!
        </p>
      </div>
      <div className="bottom" ref={ref} onScroll={scrollCheck}>
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
      <div className="scrolls">

      {scrollX !== 0 && (<div className="scroll scrollLeft" onClick={() => scroll(-100)}>
        <WestOutlinedIcon />
      </div>)}
      {!scrolEnd && (<div className="scroll scrollRight" onClick={() => scroll(100)}>
        <EastOutlinedIcon />
      </div>)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
