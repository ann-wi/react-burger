import {
  GET_ORDER_INFO,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR,
} from "../actions/constructor/getOrderItemsInfo";

let initialState = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_INFO: {
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
