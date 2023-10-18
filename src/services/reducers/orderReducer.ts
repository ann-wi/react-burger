import {
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  SEND_ORDER,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
} from "../../utils/constants";
import { TUser, TOrder } from "../../utils/types";
import { TOrderActions } from "../actions/sendGetOrder";

export type TOrderState = {
  price: number;
  orderRequestLoading: boolean;
  orderRequestError: boolean;
  orderRequestSuccess: boolean;
  user: TUser | null;
  order: TOrder | null;
  orderList: TOrder[];
};

const initialState: TOrderState = {
  price: 0,
  orderRequestLoading: false,
  orderRequestError: false,
  orderRequestSuccess: false,
  user: null,
  order: null,
  orderList: [],
};

export const sendOrderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        orderRequestLoading: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequestLoading: false,
        order: action.order,
        orderList: action.orderList,
      };
    }
    case SEND_ORDER_ERROR: {
      return {
        ...state,
        orderRequestLoading: false,
        orderRequestError: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const getOrderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequestLoading: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequestLoading: false,
        orderList: action.orders,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderRequestLoading: false,
        orderRequestError: true,
      };
    }
    default: {
      return state;
    }
  }
};
