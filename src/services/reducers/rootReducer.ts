import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { ordersReducer } from "./orderNumberReducer";
import { sendOrderReducer, getOrderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  constructorReducer: constructorReducer,
  userReducer: userReducer,
  wsReducer: wsReducer,
  sendOrderReducer: sendOrderReducer,
  ordersReducer: ordersReducer,
  getOrderReducer: getOrderReducer,
});
