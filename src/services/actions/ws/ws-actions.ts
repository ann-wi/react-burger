import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SEND_ORDERS,
} from "../../../utils/constants";
import { TOrder } from "../../../utils/types";

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload?: Event;
}

interface IWsConnectionFailed {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload?: Event;
  error?: Event;
}

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload?: Event;
}

interface IWsConnectionStop {
  readonly type: typeof WS_CONNECTION_STOP;
  payload?: Event;
}

interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  payload: any;
}

interface IWsSendOrders {
  readonly type: typeof WS_SEND_ORDERS;
  payload: TOrder;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionClosed
  | IWsConnectionFailed
  | IWsConnectionSuccess
  | IWsConnectionStop
  | IWsGetOrders
  | IWsSendOrders;

export function startConnection(url: string): IWsConnectionStart {
  return {
    type: WS_CONNECTION_START,
    url,
  };
}

//
export type TWSocketActions = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly wsClosed: typeof WS_CONNECTION_STOP;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onMessage: typeof WS_GET_ORDERS;
  readonly wsSendMessage: typeof WS_SEND_ORDERS;
};

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onError: WS_CONNECTION_ERROR,
  wsClosed: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_ORDERS,
  wsSendMessage: WS_SEND_ORDERS,
};
