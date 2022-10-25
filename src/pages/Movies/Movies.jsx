import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Loader } from "../../components";
import { IMG_URL } from "../../utils/API/api";
import { BsFileEarmarkText } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { getMoviesPupular } from "../../app/feature/movies";

const Movies = () => {
  const { popMovies } = useSelector((state) => state.movies);
  console.log(popMovies);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    dispatch(getMoviesPupular());
  }, [dispatch]);

  const onImageLoaded = () => {
    setLoaded(true);
  };
  return (
    <div>
      <Carousel fade controls={false} indicators={false}>
        <Carousel.Item>
          <div className="images relative" style={{ height: "60vh" }}>
            <img className="d-block w-100 absolute" src="https://images5.alphacoders.com/856/856026.png" alt="First slide" />
          </div>
          <Carousel.Caption>
            <div className="container">
              <div className="text-start">
                <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">All Movies</h1>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section className="container my-14" style={{ minHeight: "40vh" }}>
        <h1 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">Result All Movies</h1>
        {popMovies.length > 0 ? (
          <div className="wrapper-search grid grid-cols-4 gap-5">
            {popMovies.map((movie) => {
              return (
                <div className="movie-card relative overflow-hidden">
                  <img className="rounded-xl" src={`${IMG_URL}/${movie.poster_path}`} onLoad={onImageLoaded} alt="" />
                  {!loaded && <Loader />}
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
              );
            })}
          </div>
        ) : (
          <div className="notification flex flex-col items-center">
            <BsFileEarmarkText className="text-7xl text-gray-400" />
            <h1 className="text-base pt-4 tracking-wide text-gray-400">There isn't any data</h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Movies;
