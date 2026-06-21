import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import type { User } from "../types/userTypes";

export const signIn = createAsyncThunk<any, any>(
  "/auth/signIn",
  async ({ data, navigate, redirectTo }, { rejectWithValue }) => {
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
        navigate(redirectTo || "/");
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
  async ({ data, navigate, redirectTo }, { rejectWithValue }) => {
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
        navigate(redirectTo || "/");
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

export const forgotPassword = createAsyncThunk<any, any>(
  "/auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);
      console.log("forgotPassword response", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP. Check your email and try again.");
    }
  },
);

export const resetPassword = createAsyncThunk<any, any>(
  "/auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-password", { email, otp, newPassword });
      console.log("resetPassword response", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data?.message || "Failed to reset password. Invalid or expired OTP.");
    }
  },
);

const initialState: AuthState = {
  jwt: localStorage.getItem("jwt"),
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  otpSent: false,
  passwordResetSuccess: false,
};

interface AuthState {
  jwt: string | null;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  passwordResetSuccess: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOtpSent: (state) => {
      state.otpSent = false;
      state.passwordResetSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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

    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otpSent = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.passwordResetSuccess = false;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.passwordResetSuccess = true;
      state.otpSent = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export const { clearError, clearOtpSent } = authSlice.actions;
export default authSlice.reducer;
