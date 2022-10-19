import React, { useEffect, useState } from "react";

//import from library
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlinePlayCircle, AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { Slider } from "../../components";
import { API_TMDB_URL, BASE_URL, IMG_URL } from "../../utils/API/api";

// import css
import "./styles.css";
const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [review, setReview] = useState([]);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataMovies = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_TMDB_URL}`);
    const dataVideo = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_TMDB_URL}`);
    const dataReviews = await axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_TMDB_URL}`);
    const dataCasts = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_TMDB_URL}`);
    setMovie(dataMovies.data);
    setVideos(dataVideo.data.results[0].key);
    setReview(dataReviews.data);
    setCast(dataCasts.data.cast.splice(0, 10));
  };

  return (
    <div>
      <header>
        <Carousel fade controls={false} indicators={false}>
          <Carousel.Item>
            <div className="images relative">
              <img className="d-block w-100 absolute" src={`${IMG_URL}${movie.backdrop_path}`} alt="First slide" />
            </div>
            <Carousel.Caption>
              <div className="container ">
                <div className="header text-start">
                  <h1 className="font-medium text-7xl text-white mb-8">{movie.original_title}</h1>
                  <p className="text-white mb-8">{movie.overview}</p>
                  <p className="rating flex items-center mb-8 font-bold">
                    <AiFillStar className="mr-2" style={{ color: "#fcd34d" }} /> {Math.min(movie.vote_average).toFixed(1)} / 10
                  </p>
                  <button className="button-full rounded-3xl px-6 py-2 font-semibold flex items-center" onClick={handleShow}>
                    <AiOutlinePlayCircle className="mr-2 text-xl" /> WATCH TRAILER
                  </button>
                  <Modal show={show} onHide={handleClose} centered>
                    <div className="trailer">
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videos}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </Modal>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>
      <section className="mt-20 mb-20">
        <div className="container">
          <div className="casting">
            <h2 className="text-4xl font-semibold mb-4">Cast and Crew Info</h2>
            <Slider casts={cast} />
          </div>
          <div className="review mt-20">
            <h2 className="text-4xl font-semibold mb-4">What People Says</h2>
            <Slider reviews={review.results} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
