import { getCookie } from "../../utils/cookies-storage";
import { refreshUserToken } from "../../utils/server";
import { TWSocketActions } from "../actions/ws-actions";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../../utils/storeTypes";

export const socketMiddleware = (wsActions: TWSocketActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsClosed,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsInit) {
        const isAuth = payload.isAuth;
        const accessToken = getCookie("accessToken");
        const wsUrl = isAuth
          ? payload.url + `?token=${accessToken}`
          : payload.url;
        socket = new WebSocket(wsUrl);
      }

      if (type === wsClosed) {
        socket?.close(1000, "socket is closed");
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };

        socket.onclose = (event) => {
          dispatch({
            type: onClose,
            payload: event,
          });
        };

        if (type === wsSendMessage) {
          const orders = { ...payload };
          socket.send(JSON.stringify(orders));
        }
      }
      next(action);
    };
  };
};
