import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";

const initialState = {
  popMovies: [],
  topMovies: [],
  loading: false,
};

export const getMoviesPupular = createAsyncThunk("movies/getMoviesPupular", async () => {
  try {
    const res = await axios
      .get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_TMDB_URL,
        },
      })
      .then((res) => {
        return res.data.results;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getMoviesTop = createAsyncThunk("movies/getMoviesTop", async () => {
  try {
    const res = await axios
      .get(`${BASE_URL}/movie/top_rated`, {
        params: {
          api_key: API_TMDB_URL,
        },
      })
      .then((res) => {
        return res.data.results;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesPupular.pending]: (state) => {
      state.loading = true;
    },
    [getMoviesPupular.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.popMovies = payload;
    },
    [getMoviesPupular.rejected]: (state) => {
      state.loading = false;
    },
    [getMoviesTop.pending]: (state) => {
      state.loading = true;
    },
    [getMoviesTop.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.topMovies = payload;
    },
    [getMoviesTop.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const { movieSlice } = movieSlice.action;

export default movieSlice.reducer;
