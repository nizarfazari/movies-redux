import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlinePlayCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Akame, Kakegurui, Shokugeki } from "../../assets";
import { Slider } from "../../components";
import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";
import "./home.css";

const Home = () => {
  const [popmovies, setpopMovies] = useState([]);
  const [topmovies, settopMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await axios
        .get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_TMDB_URL,
          },
        })
        .then((res) => {
          setpopMovies(res.data.results);
        });

      await axios
        .get(`${BASE_URL}/trending/all/week`, {
          params: {
            api_key: API_TMDB_URL,
          },
        })
        .then((res) => {
          settopMovies(res.data.results);
        });
      await axios
        .get(`${BASE_URL}/genre/movie/list`, {
          params: {
            api_key: API_TMDB_URL,
          },
        })
        .then((res) => {
          setGenre(res.data.genres);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
                  <h1 className="font-medium text-7xl text-white mb-8">Kakegurui</h1>
                  <p className="text-white mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                  <button className="button-watch rounded-3xl px-6 py-2 flex items-center font-semibold">
                    <AiOutlinePlayCircle className="mr-2 text-xl" /> WATCH TRAILER
                  </button>
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
                  <h1 className="font-medium text-7xl text-white mb-8">Shokugeki no Soma</h1>
                  <p className="text-white mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                  <button className="button-watch rounded-3xl px-6 py-2 font-semibold flex items-center">
                    <AiOutlinePlayCircle className="mr-2 text-xl" /> WATCH TRAILER
                  </button>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="images relative">
              <img className="d-block w-100 absolute" src="https://images.alphacoders.com/592/592540.jpg" alt="Second slide" />
            </div>
            <Carousel.Caption>
              <div className="container ">
                <div className="header text-start">
                  <h1 className="font-medium text-7xl text-white mb-8">Akame ga Kill!</h1>
                  <p className="text-white mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                  <button className="button-watch rounded-3xl px-6 py-2 font-semibold flex items-center">
                    <AiOutlinePlayCircle className="mr-2 text-xl" /> WATCH TRAILER
                  </button>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>
      <section className="mt-20 pb-20">
        <div className="container">
          <div className="title-contents flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
            <h2 className="text-4xl font-semibold ">Popular Movie</h2>
            <p className="xl:text-lg text-base flex items-center">
              See All Movie <AiOutlineArrowRight className="ml-4" />
            </p>
          </div>
          <Slider movies={popmovies} />
          <div className="title-contents flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10 mt-20">
            <h2 className="text-4xl font-semibold ">Browse by Category</h2>
            <p className="xl:text-lg text-base flex items-center">
              See All Movie <AiOutlineArrowRight className="ml-4" />
            </p>
          </div>
          <Slider genres={genre} />
          <Slider movies={topmovies} />
        </div>
      </section>
    </div>
  );
};

export default Home;
