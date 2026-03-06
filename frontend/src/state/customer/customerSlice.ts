import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { HomeCategory, HomeData } from "../../types/homeCategoryTypes";
import { api } from "../../config/api";

// Async Thunk to create home categories
export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      console.log("home category response", response.data);
      return response.data;
    } catch (error: any) {
      // Handle the error and return it to be used in rejected action
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create home categories";
      console.log("error ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchHomePageData = createAsyncThunk<HomeData, void>(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home-page");
      console.log("fetch home page data response", response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch home page data";
      console.log("error ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface HomeState {
  homePageData: HomeData | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createHomeCategories.fulfilled,
        (state, action: PayloadAction<HomeData>) => {
          state.loading = false;
          state.homePageData = action.payload;
        },
      )
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHomePageData.fulfilled,
        (state, action: PayloadAction<HomeData>) => {
          state.loading = false;
          state.homePageData = action.payload;
        },
      )
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
