import React, { useEffect, useState } from "react";

//import from library
import Carousel from "react-bootstrap/Carousel";
import { AiOutlinePlayCircle, AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { Slider } from "../../components";
import { IMG_URL } from "../../utils/API/api";

// import css
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getCasts, getMovieById, getReviews, getVideo } from "../../app/feature/details";
const Details = () => {
  const { moviesId, videos, reviews, casts } = useSelector((state) => state.details);
  console.log(videos);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getMovieById(id));
    dispatch(getVideo(id));
    dispatch(getReviews(id));
    dispatch(getCasts(id));
  }, [dispatch, id]);

  return (
    <div>
      <header>
        <Carousel fade controls={false} indicators={false}>
          <Carousel.Item>
            <div className="images relative">
              <img className="d-block w-100 absolute" src={`${IMG_URL}${moviesId.backdrop_path}`} alt="First slide" />
            </div>
            <Carousel.Caption>
              <div className="container ">
                <div className="header text-start">
                  <h1 className="font-medium text-7xl text-white mb-8">{moviesId.original_title}</h1>
                  <p className="text-white mb-8">{moviesId.overview}</p>
                  <p className="rating flex items-center mb-8 font-bold">
                    <AiFillStar className="mr-2" style={{ color: "#fcd34d" }} /> {Math.min(moviesId.vote_average).toFixed(1)} / 10
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
            <Slider casts={casts} />
          </div>
          <div className="review mt-20">
            <h2 className="text-4xl font-semibold mb-4">What People Says</h2>
            <Slider reviews={reviews.results} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
