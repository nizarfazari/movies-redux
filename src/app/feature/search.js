import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";

const initialState = {
  movies: [],
  loading: false,
};

export const getSearchMovies = createAsyncThunk("search/getSearchMovies", async (nama) => {
  const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_TMDB_URL}&query=${nama}`);
  return res.data.results;
});

export const getByGenres = createAsyncThunk("search/getByGenres", async (cat) => {
  const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_TMDB_URL}&with_genres=${cat}`);
  return res.data.results;
});

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchMovies.pending]: (state) => {
      state.loading = true;
    },
    [getSearchMovies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.movies = payload;
    },
    [getSearchMovies.rejected]: (state) => {
      state.loading = false;
    },
    [getByGenres.pending]: (state) => {
      state.loading = true;
    },
    [getByGenres.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.movies = payload;
    },
    [getByGenres.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default searchSlice.reducer;
