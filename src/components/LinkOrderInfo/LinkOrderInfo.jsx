import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuthOrders,
  getOrders,
} from "../../services/actions/constructor/sendGetOrder";
import { WS_CONNECTION_STOP } from "../../utils/constants";
import { FeedOrderItem } from "../FeedOrderItem/FeedOrderItem";
import LinkOrderInfoStyles from "./link-order-info-styles.module.css";

export const LinkOrderInfo = ({ orders }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (order) => {
    navigate(
      location.pathname.startsWith("/profile")
        ? `/profile/orders/${order.number}`
        : `/feed/${order.number}`,
      { background: location }
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
              {orders
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
