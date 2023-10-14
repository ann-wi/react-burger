import {
  SEND_REQUEST_ORDER_INFO,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR,
} from "../../utils/constants";
import { TOrder } from "../../utils/types";
import { TOrderInfoActions } from "../actions/getOrderItemsInfo";

type TOrdersState = {
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
  orders: Array<TOrder> | [];
};

const initialState: TOrdersState = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orders: [],
};

export const ordersReducer = (
  state = initialState,
  action: TOrderInfoActions
): TOrdersState => {
  switch (action.type) {
    case SEND_REQUEST_ORDER_INFO: {
      return {
        ...state,
        orderDetailsRequest: true,
        orderDetailsFailed: false,
      };
    }
    case GET_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        orders: action.orders,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
      };
    }
    case GET_ORDER_INFO_ERROR: {
      return {
        ...state,
        orders: [],
        orderDetailsFailed: true,
        orderDetailsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
