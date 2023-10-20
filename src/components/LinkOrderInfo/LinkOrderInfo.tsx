import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthOrders, getOrders } from "../../services/actions/sendGetOrder";
import { WS_CONNECTION_STOP } from "../../utils/constants";
import { useDispatch } from "../../utils/storeTypes";
import { TOrder } from "../../utils/types";
import { FeedOrderItem } from "../FeedOrderItem/FeedOrderItem";
import LinkOrderInfoStyles from "./link-order-info-styles.module.css";

export interface ILinkOrderInfo {
  orders: TOrder[];
  isReversed: boolean;
}

export const LinkOrderInfo: FC<ILinkOrderInfo> = ({ orders, isReversed }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (order: TOrder) => {
    navigate(
      location.pathname.startsWith("/profile")
        ? `/profile/orders/${order.number}`
        : `/feed/${order.number}`,
      { state: { background: location } }
    );
  };

  //const profileLink = useRouteMatch("/profile/orders");

  //const order = data.find((elem) => elem.number === number);

  useEffect(() => {
    if (location.pathname.indexOf("/profile/orders") !== -1)
      dispatch(getAuthOrders());
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, [dispatch]);

  return (
    <>
      <main className={LinkOrderInfoStyles.box}>
        <div className={LinkOrderInfoStyles.orderLayout}>
          <section>
            <ul className={LinkOrderInfoStyles.orderBox}>
              {orders && isReversed
                ? orders
                    .map((order) => (
                      <li
                        key={order.number}
                        onClick={() => {
                          clickHandler(order);
                        }}
                      >
                        <FeedOrderItem order={order} />
                      </li>
                    ))
                    .reverse()
                : orders && !isReversed
                ? orders.map((order) => (
                    <li key={order.number} onClick={() => clickHandler(order)}>
                      <FeedOrderItem order={order} />
                    </li>
                  ))
                : null}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};
