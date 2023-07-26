import ordersInfoStyles from "./orders-info-styles.module.css";
import { useSelector } from "react-redux";

export const OrdersInfo = () => {
  const data = useSelector((state) => state.wsReducer.data);

  const completedOrders = data.orders
    .filter((order) => order.status === "done")
    .filter((order, index) => index <= 15);
  const upcomingOrders = data.orders
    .filter((order) => order.status !== "done")
    .filter((order, index) => index <= 10);

  return (
    <div className={ordersInfoStyles.container}>
      <div className={ordersInfoStyles.head}>
        <div className={ordersInfoStyles.listContainer}>
          <h2 className={ordersInfoStyles.title}>Готовы:</h2>
          <ul className={ordersInfoStyles.list}>
            {completedOrders.map((order, index) => {
              return (
                <li
                  className={`text text_type_digits-default ${ordersInfoStyles.li}`}
                  key={index}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={ordersInfoStyles.listContainer}>
          <h2 className={ordersInfoStyles.title}>В работе:</h2>
          <ul className={ordersInfoStyles.list}>
            {upcomingOrders.map((order, index) => {
              return (
                <li
                  className={`text text_type_digits-default ${ordersInfoStyles.li_upcoming}`}
                  key={index}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={ordersInfoStyles.content}>
        <h2 className={ordersInfoStyles.title}>Выполнено за все время:</h2>
        <p className={`text text_type_digits-large ${ordersInfoStyles.text}`}>
          {data.total}
        </p>
      </div>
      <div className={ordersInfoStyles.content}>
        <h2 className={ordersInfoStyles.title}>Выполнено за сегодня:</h2>
        <p className={`text text_type_digits-large ${ordersInfoStyles.text}`}>
          {data.totalToday}
        </p>
      </div>
    </div>
  );
};
