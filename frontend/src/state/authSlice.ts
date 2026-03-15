import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import type { User } from "../types/userTypes";

export const sendLoginSignupOtp = createAsyncThunk(
  "/sellers/sendLoginSignupOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email });
      console.log("login otp response", response);
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  },
);
export const signIn = createAsyncThunk<any, any>(
  "/auth/signIn",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", data);
      console.log("signIn response", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      if (response.data.role) {
        localStorage.setItem("role", response.data.role);
      }

      if (response.data.role === "ROLE_SELLER") {
        navigate("/seller");
      } else if (response.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return response.data.jwt;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data || "Failed to sign in");
    }
  },
);

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", data);
      console.log("signup response", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      if (response.data.role) {
        localStorage.setItem("role", response.data.role);
      }

      if (response.data.role === "ROLE_SELLER") {
        navigate("/seller");
      } else if (response.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return response.data.jwt;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data || "Failed to sign up");
    }
  },
);

export const logout = createAsyncThunk<any, any>(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      console.log("logout successfully");
      navigate("/");
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data || "Failed to log out");
    }
  },
);

export const fetchUserProfile = createAsyncThunk<any, any>(
  "/auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("user profile", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch user profile",
      );
    }
  },
);

export const addUserAddress = createAsyncThunk<any, any>(
  "/auth/addUserAddress",
  async ({ address, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/address", address, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("address added", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(
        error.response?.data || "Failed to add address",
      );
    }
  },
);

const initialState: AuthState = {
  jwt: localStorage.getItem("jwt"),
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading: false,
};

interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLoginSignupOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendLoginSignupOtp.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    });
    builder.addCase(sendLoginSignupOtp.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(addUserAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserAddress.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(addUserAddress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
