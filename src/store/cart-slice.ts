import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  type: string;
  item: string;
  price: number;
  quantity: number;
};
export type Cartitem = {
  type: string;
  item: string;
  price: number;
};

type CartState = {
  items: CartItem[];
  activeOption: string;
};

const initialState: CartState = {
  items: [],
  activeOption: "Items",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(
      state,
      action: PayloadAction<{ type: string; item: string; price: number }>
    ) {
      const itemIndex = state.items.findIndex(
        (item) => item.item === action.payload.item
      );
      console.log("itemIndex", itemIndex);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removefromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item) => item.item === action.payload
      );
      if (state.items[index].quantity === 1) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity--;
      }
    },
    setActiveOption(state, action: PayloadAction<string>) {
      state.activeOption = action.payload;
    },
    clearCartData(state) {
      state.items = [];
    },
  },
});

export const { addTocart, removefromCart, setActiveOption, clearCartData } =
  cartSlice.actions;
