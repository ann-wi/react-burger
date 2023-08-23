import ordersInfoPanelStyles from "./orders-info-panel-styles.module.css";
import { useSelector } from "react-redux";

export const OrdersInfoPanel = () => {
  const data = useSelector((state) => state.wsReducer.data);

  const completedOrders = data.orders
    .filter((order) => order.status === "done")
    .filter((order, index) => index <= 15);
  const upcomingOrders = data.orders
    .filter((order) => order.status !== "done")
    .filter((order, index) => index <= 10);

  return (
    <div className={ordersInfoPanelStyles.container}>
      <div className={ordersInfoPanelStyles.head}>
        <div className={ordersInfoPanelStyles.listContainer}>
          <h2 className={ordersInfoPanelStyles.title}>Готовы:</h2>
          <ul className={ordersInfoPanelStyles.list}>
            {completedOrders.map((order, index) => {
              return (
                <li
                  className={`text text_type_digits-default ${ordersInfoPanelStyles.li}`}
                  key={index}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={ordersInfoPanelStyles.listContainer}>
          <h2 className={ordersInfoPanelStyles.title}>В работе:</h2>
          <ul className={ordersInfoPanelStyles.list}>
            {upcomingOrders.map((order, index) => {
              return (
                <li
                  className={`text text_type_digits-default ${ordersInfoPanelStyles.li_upcoming}`}
                  key={index}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={ordersInfoPanelStyles.content}>
        <h2 className={ordersInfoPanelStyles.title}>Выполнено за все время:</h2>
        <p
          className={`text text_type_digits-large ${ordersInfoPanelStyles.text}`}
        >
          {data.total}
        </p>
      </div>
      <div className={ordersInfoPanelStyles.content}>
        <h2 className={ordersInfoPanelStyles.title}>Выполнено за сегодня:</h2>
        <p
          className={`text text_type_digits-large ${ordersInfoPanelStyles.text}`}
        >
          {data.totalToday}
        </p>
      </div>
    </div>
  );
};
