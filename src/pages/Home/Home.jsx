import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import bg from "../../assets/bg.jpeg";
import bg2 from "../../assets/bg2.jpg";
import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";
import "./home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_TMDB_URL,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div>
      <header>
        <Carousel fade controls={false}>
          <Carousel.Item pause={true}>
            <img className="d-block w-100" src={bg} alt="First slide" />
            <Carousel.Caption>
              <div className=" containers header text-start">
                <h1 className="font-medium text-7xl text-white mb-8">Doctror Strange in the Multiverse of Madness</h1>
                <p className="text-white mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                <button className="button-watch rounded-3xl px-6 py-2">WATCH TRAILER</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={bg2} />
            <Carousel.Caption>
              <div className=" containers header text-start">
                <h1 className="font-medium text-7xl text-white mb-10">Doctror Strange in the Multiverse of Madness</h1>
                <p className="text-white mb-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                <button className="button-watch rounded-3xl px-6 py-2">WATCH TRAILER</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={bg} />
            <Carousel.Caption>
              <div className=" containers header text-start">
                <h1 className="font-medium text-7xl text-white mb-8">Doctror Strange in the Multiverse of Madness</h1>
                <p className="text-white mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad rem odio, saepe voluptate aut quo nam sapiente explicabo perferendis?</p>
                <button className="button-watch rounded-3xl px-6 py-2">WATCH TRAILER</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>
      <section>
        <div className="title-contents flex">
          <h2>Popular Movie</h2>
          <p>See All Movie</p>
        </div>
        <div className="card"></div>
      </section>
    </div>
  );
};

export default Home;
