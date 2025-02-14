import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, API_ENDPOINT } from "./config";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }) => {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          apikey: API_KEY,  
          s: query,        
          page,            
          type: "movie",
        },
      });

      if (response.data.Response === "False") {
        throw new Error(response.data.Error || "No movies found");
      }

      return {
        results: response.data.Search || [],
        page,
        totalPages: Math.ceil(response.data.totalResults / 10), // OMDb returns 10 movies per page
      };
    } catch (error) {
      throw new Error(error.response?.data?.Error || "Failed to fetch movies");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
