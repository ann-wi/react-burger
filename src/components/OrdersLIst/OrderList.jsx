import { OrderListItem } from "../OrderListItem/OrderListItem";
import orderListStyles from "./order-list-styles.module.css";
import { useEffect } from "react";
import uuid from "react-uuid";

export const OrderList = (props) => {
  return (
    <div className={orderListStyles.list}>
      {props.orders &&
        props.orders.map((item) => {
          return (
            <div className={orderListStyles.link}>
              <OrderListItem order={item} key={item._id} />
            </div>
          );
        })}
    </div>
  );
};
