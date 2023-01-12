import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer.js";
import { AuthSlice } from "./AuthSlice.js";
import { wishlistSlice } from "./wishlistReducer.js";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: AuthSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});
