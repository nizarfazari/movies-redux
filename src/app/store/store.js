import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../feature/movies";
import genresReducer from "../feature/genres";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genresReducer,
  },
});
