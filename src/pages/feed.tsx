import FeedStyles from "./feed-styles.module.css";
import { FC, useEffect } from "react";
import { WS_CONNECTION_STOP, WS_CONNECTION_START } from "../utils/constants";
import { OrdersInfoPanel } from "../components/OrdersInfo/OrdersInfoPanel";
import { LinkOrderInfo } from "../components/LinkOrderInfo/LinkOrderInfo";
import { useDispatch, useSelector } from "../utils/storeTypes";

export const FeedPage: FC = () => {
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
