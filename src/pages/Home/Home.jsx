import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlinePlayCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Akame, Kakegurui, Shokugeki } from "../../assets";
import { Slider } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getMoviesPupular, getMoviesTop } from "../../app/feature/movies";
import { getGenres } from "../../app/feature/genres";

const Home = () => {
  const { popMovies, topMovies } = useSelector((state) => state.movies);

  console.log(popMovies);
  const genres = useSelector((state) => state.genres);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // getData();
    dispatch(getMoviesPupular());
    dispatch(getMoviesTop());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="">
      <header>
        <Carousel fade controls={false}>
          <Carousel.Item>
            <div className="images relative">
              <img className="d-block w-100 absolute" src={Kakegurui} alt="First slide" />
            </div>
            <Carousel.Caption>
              <div className="container ">
                <div className="header text-start">
                  <h1 className="font-medium text-7xl text-white mb-8 ">Kakegurui</h1>
                  <p className="text-white mb-8 ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                  <a href={Akame}>
                    <button className="button-full rounded-3xl px-6 py-2 flex items-center font-semibold">
                      <AiOutlinePlayCircle className="mr-2 text-xl icon-trailer" /> WATCH TRAILER
                    </button>
                  </a>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="images relative">
              <img className="d-block w-100 absolute" src={Shokugeki} alt="First slide" />
            </div>
            <Carousel.Caption>
              <div className="  container">
                <div className="header text-start">
                  <h1 className="font-medium text-7xl text-white mb-8  ">Shokugeki no Soma</h1>
                  <p className="text-white mb-8 ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                  <a href="https://www.youtube.com/watch?v=--v6zWSR_Ko&ab_channel=MadmanAnime">
                    <button className="button-full rounded-3xl px-6 py-2 font-semibold flex items-center ">
                      <AiOutlinePlayCircle className="mr-2 text-xl icon-trailer" /> WATCH TRAILER
                    </button>
                  </a>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="images relative">
              <img className="d-block w-100 absolute" src={Akame} alt="Second slide" />
            </div>
            <Carousel.Caption>
              <div className="container ">
                <div className="header text-start">
                  <h1 className="font-medium text-7xl text-white mb-8 ">Akame ga Kill!</h1>
                  <p className="text-white mb-8 ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                  <a href="https://www.youtube.com/watch?v=sasgDq9jidk&ab_channel=AnimexMoviesHD">
                    <button className="button-full rounded-3xl px-6 py-2 font-semibold flex items-center">
                      <AiOutlinePlayCircle className="mr-2 text-xl icon-trailer" /> WATCH TRAILER
                    </button>
                  </a>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>
      <section className="section-movie mt-20 pb-20">
        <div className="container">
          <div className="title-contents flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
            <h2 className="text-4xl popular font-semibold ">Popular Movie</h2>
            <p className="xl:text-lg text-base flex items-center cursor-pointer" onClick={() => navigate("/all-movies")}>
              See All Movie <AiOutlineArrowRight className="ml-4" />
            </p>
          </div>
          <Slider movies={popMovies} />
          <div className="title-contents flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10 mt-20">
            <h2 className="text-4xl font-semibold ">Browse by Category</h2>
            <p className="xl:text-lg text-base flex items-center cursor-pointer" onClick={() => navigate("/all-movies")}>
              See All Movie <AiOutlineArrowRight className="ml-4" />
            </p>
          </div>
          <Slider genres={genres.genres} />
          <Slider movies={topMovies} />
        </div>
      </section>
    </div>
  );
};

export default Home;
