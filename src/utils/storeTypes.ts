import { TConstructorActions } from "../services/actions/constructorActions";
import { store } from "../services/store";
import { ThunkDispatch } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { Dispatch } from "redux";
import { rootReducer } from "../services/reducers/rootReducer";
import { TOrderActions } from "../services/actions/sendGetOrder";
import { TOrderInfoActions } from "../services/actions/getOrderItemsInfo";
import { TUserActions } from "../services/actions/server-actions-user";
import { TWsActions } from "../services/actions/ws-actions";

type TAppActions =
  | TConstructorActions
  | TOrderInfoActions
  | TOrderActions
  | TUserActions
  | TWsActions;

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>();

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;

// export type AppDispatch = Dispatch<TAppActions>;
