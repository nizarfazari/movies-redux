import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import "./styles.css";

import { IMG_URL } from "../../utils/API/api";
const Slider = (props) => {
  const { movies, genres } = props;

  if (genres) {
    return (
      <>
        <Swiper
          slidesPerView={7}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {genres &&
            genres.map((genre) => {
              console.log(genre);
              return (
                <SwiperSlide className="cursor-pointer h-auto mb-10 me-4 genre-slider" key={genre.id}>
                  <button className="button-genre rounded-3xl px-6 py-2">{genre.name}</button>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </>
    );
  } else {
    return (
      <>
        <Swiper
          slidesPerView={4}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {movies &&
            movies.map((movie) => {
              console.log(movie);
              return (
                <SwiperSlide className="cursor-pointer" key={movie.id}>
                  <img className="rounded-xl" src={`${IMG_URL}/${movie.poster_path}`} alt="" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </>
    );
  }
};

export default Slider;
