import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { userReducer } from "./userReducer";
import { modalPageSwitchReducer } from "./modalPageSwitchReducer";

export const rootReducer = combineReducers({
  constructorReducer,
  userReducer,
  modalPageSwitchReducer,
});
