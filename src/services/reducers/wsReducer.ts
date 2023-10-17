import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../../utils/constants";
import { TWsActions } from "../actions/ws/ws-actions";

type TWSocketState = {
  wsConnected: boolean;
  data:
    | {
        orders: [];
        total: number;
        totalToday: number;
      }
    | any;
  error?: Event;
};

const initialState = {
  wsConnected: false,
  data: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = (
  state: TWSocketState = initialState,
  action: TWsActions
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        data: state.data.length
          ? [...state.data, action.payload]
          : action.payload,
      };

    default:
      return state;
  }
};
