import {
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  SEND_ORDER,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
} from "../../utils/constants";

const initialState = {
  price: 0,
  orderRequestLoading: false,
  orderRequestError: false,
  orderRequestSuccess: false,
  user: {},
  order: {},
  orderList: [],
};

export const sendOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequestLoading: false,
        order: action.payload.order,
        orderList: action.payload.ingredients,
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

export const getOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        ...action.payload,
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
