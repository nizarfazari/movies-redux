import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { BsFileEarmarkText } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import "./styles.css";

import { IMG_URL, IMG_URL_500 } from "../../utils/API/api";
import { useNavigate } from "react-router-dom";
const Slider = (props) => {
  const navigate = useNavigate();
  const { movies, genres, reviews, casts } = props;

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
              return (
                <SwiperSlide className="cursor-pointer h-auto mb-10 me-4 genre-slider" key={genre.id} onClick={() => navigate("/")}>
                  <button className="button-genre rounded-3xl px-6 py-2">{genre.name}</button>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </>
    );
  }
  if (casts) {
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
          {casts &&
            casts.map((cast) => {
              return (
                <SwiperSlide className="cursor-pointer" key={cast.id}>
                  <img className="rounded-xl mb-3" src={`${IMG_URL_500}/${cast.profile_path}`} alt="" />
                  <h1 className="font-bold text-lg mb-1">{cast.name}</h1>
                  <p className="text-gray-500">{cast.character}</p>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </>
    );
  }
  if (reviews) {
    return (
      <>
        <Swiper
          slidesPerView={2}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {reviews.length > 0 ? (
            reviews.map((review) => {
              return (
                <SwiperSlide className="cursor-pointer" key={review.id}>
                  <div className="review-card p-7 border border-solid border-gray-200 rounded-xl">
                    <div className="flex items-center mb-4">
                      <span>
                        {/* {review.author_details.avatar_path ? <img className="w-10" src={`${IMG_URL_500}/${review.author_details.avatar_path}`} /> : <img className="w-10" src={`https://ui-avatars.com/api/?name=${review.author}`} />} */}
                        {<img className="w-10 rounded-3xl" src={`https://ui-avatars.com/api/?name=${review.author}`} />}
                      </span>
                      <span className="ml-4">{review.author}</span>
                    </div>
                    <p className="font-bold mb-3 flex items-center ">
                      {review.author_details.rating === null ? (
                        "empty"
                      ) : (
                        <div className="flex items-center">
                          <AiFillStar className="mr-2" style={{ color: "#fcd34d" }} /> {Math.min(review.author_details.rating).toFixed(1)} / 10
                        </div>
                      )}
                    </p>
                    <h1 className="font-light text-sm mb-3 leading-relaxed">{review.content}</h1>
                    <p className="text-sm m-0 text-gray-500"></p>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="notification flex flex-col items-center">
              <BsFileEarmarkText className="text-7xl text-gray-400" />
              <h1 className="text-base pt-4 tracking-wide text-gray-400">There isn't any data</h1>
            </div>
          )}
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
              return (
                <SwiperSlide className="cursor-pointer" key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                  <div className="movie-card relative">
                    <img className="rounded-xl" src={`${IMG_URL}/${movie.poster_path}`} alt="" />

                    <div className="movie-description absolute">
                      <h4 className="font-bold text-lg text-white mb-3">{movie.original_title}</h4>
                      <p
                        className="
                       text-sm text-white mb-3 flex items-center "
                      >
                        <AiFillStar className="mr-2" style={{ color: "#fcd34d" }} /> {Math.min(movie.vote_average).toFixed(1)} / 10
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </>
    );
  }
};

export default Slider;
