import { OrderListItem } from "../OrderListItem/OrderListItem";
import { Link } from "react-router-dom";
import orderListStyles from "./order-list-styles.module.css";
import { useEffect } from "react";

export const OrderList = (props) => {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div className={orderListStyles.list}>
      {props.orders &&
        props.orders.map((item) => {
          return (
            <Link
              className={orderListStyles.link}
              to={`/feed/${item._id}`}
              key={item._id}
            >
              <OrderListItem order={item} key={item._id} />
            </Link>
          );
        })}
    </div>
  );
};
