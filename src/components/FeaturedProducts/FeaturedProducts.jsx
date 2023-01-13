import React from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

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
          slidesPerView={4}
          // slidesPerGroup={4}
          spaceBetween={30}
          loop={true}
          // loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
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
