import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/productSlice";
import authSlice from "./authSlice";
import cartSlice from "./customer/cartSlice";
import orderSlice from "./customer/orderSlice";
import wishlistSlice from "./customer/wishlistSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import transactionSlice from "./seller/transactionSlice";
import adminSlice from "./admin/adminSlice";
import customerSlice from "./customer/customerSlice";
import dealSlice from "./admin/dealSlice";
import adminCouponSlice from "./admin/adminCouponSlice";
import reviewSlice from "./customer/reviewSlice";
import snackbarSlice, { showSnackbar } from "./snackbarSlice";

const rootReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  home: customerSlice,
  deal: dealSlice,
  coupon: adminCouponSlice,
  review: reviewSlice,

  //seller slice
  sellerOrder: sellerOrderSlice,
  transactions: transactionSlice,

  // admin
  admin: adminSlice,
  snackbar: snackbarSlice,
});

const rtkQueryErrorLogger: Middleware =
  (api: any) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      let errorMessage = "An error occurred";
      if (typeof action.payload === "string") {
        errorMessage = action.payload;
      } else if (action.payload && action.payload.message) {
        errorMessage = action.payload.message;
      } else if (action.payload && action.payload.error) {
        errorMessage = action.payload.error;
      } else if (action.error && action.error.message) {
        errorMessage = action.error.message;
      }

      api.dispatch(
        showSnackbar({
          message: errorMessage,
          severity: "error",
        })
      );
    }
    return next(action);
  };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
