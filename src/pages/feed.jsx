import FeedStyles from "./feed-styles.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_STOP, WS_CONNECTION_START } from "../utils/constants";
import { OrderList } from "../components/OrdersLIst/OrderList";
import { OrdersInfoPanel } from "../components/OrdersInfo/OrdersInfoPanel";
import { useNavigate } from "react-router-dom";
import { FeedOrderItem } from "../components/FeedOrderItem/FeedOrderItem";
import { LinkOrderInfo } from "../components/LinkOrderInfo/LinkOrderInfo";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.wsReducer.data.orders);
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        url: "wss://norma.nomoreparties.space/orders/all",
        isAuth: true,
      },
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, [dispatch]);

  return (
    <>
      <h1 className={FeedStyles.title}>Лента заказов</h1>
      <div className={FeedStyles.container}>
        {ingredients && data && (
          <LinkOrderInfo orders={data} isReversed={false} />
        )}
        <OrdersInfoPanel />
      </div>
    </>
  );
};
