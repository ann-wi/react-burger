import { combineReducers, applyMiddleware } from "redux";
import { reactBurgerReducer } from "./burgerConstructorReducer";

export const rootReducer = combineReducers({
  reactBurgerReducer,
});
