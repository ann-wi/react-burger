import { createReducer } from "@reduxjs/toolkit";
import { getBurgerConstructor } from "../actions/burgerConstructor";
import { getIngredientsList } from "../actions/burgerIngredients";

const initialState = {
  data: [],
  isOpened: false,
};

export const reactBurgerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getBurgerConstructor, (state, action) => {
      state.data = action.payload.data;
    })
    .addCase(getIngredientsList, (state, action) => {
      state.data = action.payload.data;
    });
});
