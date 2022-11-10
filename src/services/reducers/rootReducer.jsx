import { combineReducers } from "redux";
import { reactBurgerReducer } from "./burgerConstructorReducer";

export const rootReducer = combineReducers({
  reactBurgerReducer,
});
