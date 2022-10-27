import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";

const initialState = {
  genres: [],
  loading: false,
};

export const getGenres = createAsyncThunk("genres/getGenres", async () => {
  try {
    const res = await axios
      .get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_TMDB_URL,
        },
      })
      .then((res) => {
        return res.data.genres;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: {
    [getGenres.pending]: (state) => {
      state.loading = true;
    },
    [getGenres.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.genres = payload;
    },
    [getGenres.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default genreSlice.reducer;
