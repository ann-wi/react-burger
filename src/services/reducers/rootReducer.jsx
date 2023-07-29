import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { sendOrderReducer, getOrderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  constructorReducer,
  userReducer,
  wsReducer,
  sendOrderReducer,
  getOrderReducer,
});
