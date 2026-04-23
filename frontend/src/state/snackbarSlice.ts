import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<{ message: string; severity?: SnackbarState['severity'] }>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "error";
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
