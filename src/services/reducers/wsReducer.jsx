import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
} from "../../utils/constants";

const initialState = {
  wsConnected: false,
  data: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: "",
};

export const wsReducer = (state = initialState, action) => {
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
