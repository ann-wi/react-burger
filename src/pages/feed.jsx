import feedStyles from "./feed-styles.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startConnection } from "../services/actions/ws/wsConnectionStart";
import { WS_CONNECTION_STOP, WS_CONNECTION_START } from "../utils/constants";
import { OrderList } from "../components/OrdersLIst/OrderList";
import { OrdersInfo } from "../components/OrdersInfo/OrdersInfo";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.wsReducer.data);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        url: "wss://norma.nomoreparties.space/orders/all",
        isAuth: true,
      },
    });
    // WHY STOP ?????
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, [dispatch]);

  return (
    <>
      <h1 className={feedStyles.title}>Лента заказов</h1>
      <div className={feedStyles.container}>
        <OrderList orders={data.orders} />
        <OrdersInfo />
      </div>
    </>
  );
};
