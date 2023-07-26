import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  constructorReducer,
  userReducer,
  wsReducer,
});
