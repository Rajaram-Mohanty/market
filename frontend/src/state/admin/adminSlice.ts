import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { HomeCategory } from "../../types/homeCategoryTypes";
import { api } from "../../config/api";

const API_URL = "/admin";

export const updateHomeCategory = createAsyncThunk<
  HomeCategory,
  { id: number; data: HomeCategory }
>(
  "homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/home-category/${id}`, data);
      console.log("category updated", response);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return error response data if available
      } else {
        return rejectWithValue(
          "An error occurred while updating the category.",
        );
      }
    }
  },
);

export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
  "homeCategory/fetchHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/home-category`);
      console.log("categories ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

export const deleteHomeCategory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("homeCategory/deleteHomeCategory", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/home-category/${id}`);
    console.log("category deleted", id);
    return id;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete category",
    );
  }
});

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
  categoryUpdated: boolean;
}

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};

// Create the slice
const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state for updateHomeCategory
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false;
      })
      // Handle the fulfilled state for updateHomeCategory
      .addCase(
        updateHomeCategory.fulfilled,
        (state, action: PayloadAction<HomeCategory>) => {
          state.loading = false;
          state.categoryUpdated = true; // Set categoryUpdated flag to true
          // Find the category by ID and update it in the state
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.id,
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          } else {
            state.categories.push(action.payload); // If the category doesn't exist, add it (optional)
          }
        },
      )
      // Handle the rejected state for updateHomeCategory
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch home category
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false; // Reset categoryUpdated flag to false
      })
      .addCase(
        fetchHomeCategories.fulfilled,
        (state, action: PayloadAction<HomeCategory[]>) => {
          state.loading = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete home category
      .addCase(deleteHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteHomeCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (c) => c.id !== action.payload,
          );
        },
      )
      .addCase(deleteHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeCategorySlice.reducer;
