import { TConstructorActions } from "../services/actions/constructorActions";
import { store } from "../services/store";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { Dispatch } from "redux";

//type TAppActions = TConstructorActions;

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>();

export type AppDispatch = typeof store.dispatch;

// export type AppDispatch = Dispatch<TAppActions>;
