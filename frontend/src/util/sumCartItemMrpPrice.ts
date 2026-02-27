import type { CartItem } from "../types/cartTypes";

const sumCartItemMrpPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.mrpPrice*item.quantity, 0);
};

const sumCartItemSellingPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.sellingPrice*item.quantity, 0);
};

export {sumCartItemSellingPrice, sumCartItemMrpPrice};