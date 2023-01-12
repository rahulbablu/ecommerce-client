import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlist?.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.wishlist?.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    resetWishlist: (state,action) => {
      state.wishlist = []
    },
    setWishlist: (state,action) => {
      state.wishlist = action.payload
    }
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist, setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
