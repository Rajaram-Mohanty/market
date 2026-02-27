import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Deal, DealsState } from "../../types/dealTypes";
import { api } from "../../config/api";

const initialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

// Async thunks
export const createDeal = createAsyncThunk<Deal, any, { rejectValue: string }>(
  "deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("create deal", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal",
      );
    }
  },
);

export const getAllDeals = createAsyncThunk<
  Deal[],
  void,
  { rejectValue: string }
>("deals/getAllDeals", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/deals", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log("get all deals", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch deals",
    );
  }
});

export const deleteDeal = createAsyncThunk<
  number, // Returning the ID of the deleted deal
  number,
  { rejectValue: string }
>("deals/deleteDeal", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/deals/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return id;
  } catch (error: any) {
    console.log("error", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete deal",
    );
  }
});

// Slice definition
const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Deal Cases
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
      })
      .addCase(createDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
        state.loading = false;
        state.deals.push(action.payload);
        state.dealCreated = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get All Deals Cases
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDeals.fulfilled,
        (state, action: PayloadAction<Deal[]>) => {
          state.loading = false;
          state.deals = action.payload;
        },
      )
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Deal Cases
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.deals = state.deals.filter((deal) => deal.id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dealSlice.reducer;
