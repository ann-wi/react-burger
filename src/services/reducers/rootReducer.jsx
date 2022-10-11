//import { configureStore } from "@reduxjs/toolkit";
//import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, applyMiddleware } from "redux";
import { reactBurgerReducer } from "./burgerConstructorReducer";

export const rootReducer = combineReducers({
  reactBurgerReducer,
});
