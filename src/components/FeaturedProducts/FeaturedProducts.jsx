import React, { useEffect } from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useState } from "react";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  const [medium, setMedium] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setMedium(true);
    }
  }, []);

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Buy our {type} products at jaw-dropping discounts upto 30 to 50% off!
        </p>
      </div>
      <div className="bottom">
        <Swiper
          slidesPerView={medium ? 3 : 4}
          spaceBetween={medium ? 15 : 30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={medium ? false : true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {error
            ? "Something went wrong!"
            : loading
            ? "loading"
            : data?.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card item={item} key={item.id} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProducts;
