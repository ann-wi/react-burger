import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  constructorReducer,
  userReducer,
});
