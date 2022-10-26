import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";

const initialState = {
  moviesId: [],
  videos: [],
  reviews: [],
  casts: false,
};

export const getMovieById = createAsyncThunk(
  //action type string
  "details/getMovieById",
  // callback function
  async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_TMDB_URL}`);
    return res.data;
  }
);

export const getVideo = createAsyncThunk(
  //action type string
  "details/getVideo",
  // callback function
  async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_TMDB_URL}`);
    return res.data.results[0].key;
  }
);

export const getReviews = createAsyncThunk(
  //action type string
  "details/getReviews",
  // callback function
  async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_TMDB_URL}`);
    return res.data;
  }
);

export const getCasts = createAsyncThunk(
  //action type string
  "details/getCasts",
  // callback function
  async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_TMDB_URL}`);
    return res.data.cast.splice(0, 10);
  }
);

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: {
    [getMovieById.pending]: (state) => {
      state.loading = true;
    },
    [getMovieById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.moviesId = payload;
    },
    [getMovieById.rejected]: (state) => {
      state.loading = false;
    },
    [getVideo.pending]: (state) => {
      state.loading = true;
    },
    [getVideo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.videos = payload;
    },
    [getVideo.rejected]: (state) => {
      state.loading = false;
    },
    [getReviews.pending]: (state) => {
      state.loading = true;
    },
    [getReviews.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reviews = payload;
    },
    [getReviews.rejected]: (state) => {
      state.loading = false;
    },
    [getCasts.pending]: (state) => {
      state.loading = true;
    },
    [getCasts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.casts = payload;
    },
    [getCasts.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default detailsSlice.reducer;
