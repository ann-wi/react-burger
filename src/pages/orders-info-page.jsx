import OrderInfoStyles from "./orders-info-page-styles.module.css";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAuthOrders,
  getOrders,
} from "../services/actions/constructor/sendGetOrder";
import { WS_CONNECTION_STOP, WS_CONNECTION_START } from "../utils/constants";
import { OrderIngredientsInfo } from "../components/OrderIngredientsInfo/OrderIngredientsInfo";
import {
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderInfo } from "../services/actions/constructor/getOrderItemsInfo";

export const OrderInfoPage = () => {
  const data = useSelector((state) => state.ordersReducer.orders);

  const dispatch = useDispatch();
  const { number } = useParams();
  const location = useLocation();

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

  const order = useSelector((state) => {
    let order = state.wsReducer.data.orders?.find(
      (elem) => String(elem.number) === number
    );
    if (order) {
      return order;
    }
    order = state.ordersReducer.orders?.find(
      (elem) => String(elem.number) === number
    );
    if (order) {
      return order;
    }
    return null;
  });

  useEffect(() => {
    if (!order) {
      dispatch(getOrderInfo(number));
    }
  }, [dispatch, order]);

  return (
    <>
      {
        <div className={OrderInfoStyles.wrapper}>
          <div className={OrderInfoStyles.box}>
            <div className={OrderInfoStyles.orderItem}>
              <p
                className={`${OrderInfoStyles.orderNumber} text text_type_digits-default pb-10`}
              >
                #{order.number}
              </p>
              <p className="text text_type_main-medium pb-3">{order.name}</p>
              {order.status && (
                <p className={OrderInfoStyles.status}>
                  {order.status === "done"
                    ? "Выполнен"
                    : order.status === "pending"
                    ? "Готовится"
                    : order.status === "created"
                    ? "Создан"
                    : "Выполнен"}
                </p>
              )}
              <p className="text text_type_main-medium pb-6">Состав:</p>
              <ul className={`${OrderInfoStyles.ingredientsList} pr-6`}>
                list
              </ul>
              <div className={OrderInfoStyles.descriptionTotal}>
                <p className="text text_type_main-default text_color_inactive">
                  gfgd
                </p>
                <div className={OrderInfoStyles.totalSum}>
                  <p
                    className={`${OrderInfoStyles.sum} text text_type_digits-default`}
                  >
                    00000
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </div>
          <div className={OrderInfoStyles.closeIcon}>
            <CloseIcon type="primary" />
          </div>
        </div>
      }
    </>
  );
};

/*
return (
    <>
      {
        <div className={OrderInfoStyles.wrapper}>
          <div className={OrderInfoStyles.box}>
            <div className={OrderInfoStyles.orderItem}>
              <p
                className={`${OrderInfoStyles.orderNumber} text text_type_digits-default pb-10`}
              >
                #{order.number}
              </p>
              <p className="text text_type_main-medium pb-3">{order.name}</p>
              {order.status && (
                <p className={OrderInfoStyles.status}>
                  {order.status === "done"
                    ? "Выполнен"
                    : order.status === "pending"
                    ? "Готовится"
                    : order.status === "created"
                    ? "Создан"
                    : "Выполнен"}
                </p>
              )}
              <p className="text text_type_main-medium pb-6">Состав:</p>
              <ul className={`${OrderInfoStyles.ingredientsList} pr-6`}>
                <OrderIngredientsInfo
                  data={selectedOrderData}
                  key={order._id}
                />
              </ul>
              <div className={OrderInfoStyles.descriptionTotal}>
                <p className="text text_type_main-default text_color_inactive">
                  gfgd
                </p>
                <div className={OrderInfoStyles.totalSum}>
                  <p
                    className={`${OrderInfoStyles.sum} text text_type_digits-default`}
                  >
                    {orderTotalPrice}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </div>
          <div className={OrderInfoStyles.closeIcon}>
            <CloseIcon type="primary" />
          </div>
        </div>
      }
    </>
  );
*/
