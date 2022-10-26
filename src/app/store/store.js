import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../feature/movies";
import genresReducer from "../feature/genres";
import searchReducer from "../feature/search";
import detailsReducer from "../feature/details";
import usersReducer from "../feature/users";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genresReducer,
    search: searchReducer,
    details: detailsReducer,
    users: usersReducer,
  },
});
