import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useLocation, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IMG_URL } from "../../utils/API/api";
import { BsFileEarmarkText } from "react-icons/bs";
import { Loader, Slider } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getSearchMovies, getByGenres } from "../../app/feature/search";
import { getGenres } from "../../app/feature/genres";
const Search = () => {
  const { movies } = useSelector((state) => state.search);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { nama, cat } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (nama) {
      dispatch(getSearchMovies(nama));
    } else {
      dispatch(getGenres());
      dispatch(getByGenres(cat));
    }
  }, [nama, cat, dispatch]);

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
                {cat ? (
                  <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">Genre "{location.state}"</h1>
                ) : (
                  <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">All Movies "{nama}"</h1>
                )}
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section className="container my-14" style={{ minHeight: "40vh" }}>
        {cat ? (
          <>
            <h1 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">Browse by Category "{location.state}"</h1>
            <Slider genres={genres.genres} />
          </>
        ) : (
          <h1 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">Search Result "{nama}"</h1>
        )}

        {movies.length > 0 ? (
          <div className="wrapper-search grid grid-cols-4 gap-5">
            {movies.map((movie) => {
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

export default Search;
