import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Coupon, CouponState } from "../../types/couponTypes";
import { api } from "../../config/api";

const API_URL = "/api/coupons";

const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};

// Async thunks
export const createCoupon = createAsyncThunk<
  Coupon,
  { coupon: any; jwt: string },
  { rejectValue: string }
>("coupon/createCoupon", async ({ coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/admin/create`, coupon, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("create coupon", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(error.response?.data || "Failed to create coupon");
  }
});

export const fetchAllCoupons = createAsyncThunk<
  Coupon[],
  string, // jwt
  { rejectValue: string }
>("coupon/fetchAllCoupons", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("fetch all coupons", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(error.response?.data || "Failed to fetch coupons");
  }
});

export const deleteCoupon = createAsyncThunk<
  number,
  { id: number; jwt: string },
  { rejectValue: string }
>("coupon/deleteCoupon", async ({ id, jwt }, { rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/admin/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete coupon", id);
    return id;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(error.response?.data || "Failed to delete coupon");
  }
});

export const updateCoupon = createAsyncThunk<
  Coupon,
  { id: number; coupon: any; jwt: string },
  { rejectValue: string }
>("coupon/updateCoupon", async ({ id, coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`${API_URL}/admin/update/${id}`, coupon, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("update coupon", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(error.response?.data || "Failed to update coupon");
  }
});

// Slice definition
const adminCouponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponCreated = false;
      })
      .addCase(
        createCoupon.fulfilled,
        (state, action: PayloadAction<Coupon>) => {
          state.loading = false;
          state.coupons.push(action.payload);
          state.couponCreated = true;
        },
      )
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All Coupons
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCoupons.fulfilled,
        (state, action: PayloadAction<Coupon[]>) => {
          state.loading = false;
          state.coupons = action.payload;
        },
      )
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCoupon.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.coupons = state.coupons.filter(
            (coupon) => coupon.id !== action.payload,
          );
        },
      )
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Coupon
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCoupon.fulfilled,
        (state, action: PayloadAction<Coupon>) => {
          state.loading = false;
          const index = state.coupons.findIndex(
            (c) => c.id === action.payload.id,
          );
          if (index !== -1) {
            state.coupons[index] = action.payload;
          }
        },
      )
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCouponSlice.reducer;
