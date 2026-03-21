import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review, ReviewState, CreateReviewRequest } from "../../types/reviewTypes";
import { api } from "../../config/api";

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  submitted: false,
};

// Fetch all reviews for a product (public)
export const fetchReviewsByProductId = createAsyncThunk<Review[], number>(
  "review/fetchByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/${productId}/reviews`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// Create a new review (requires JWT)
export const createReview = createAsyncThunk<
  Review,
  { productId: number; request: CreateReviewRequest }
>(
  "review/create",
  async ({ productId, request }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/product/${productId}/reviews`, request);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit review");
    }
  }
);

// Delete a review (only the author can)
export const deleteReview = createAsyncThunk<number, number>(
  "review/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/reviews/${reviewId}`);
      return reviewId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete review");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewSubmitted: (state) => {
      state.submitted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitted = false;
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.unshift(action.payload); // prepend the new review
        state.loading = false;
        state.submitted = true;
      })
      .addCase(createReview.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<number>) => {
        state.reviews = state.reviews.filter((r) => r.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewSubmitted } = reviewSlice.actions;
export default reviewSlice.reducer;
