import OrderInfoStyles from "./orders-info-page-styles.module.css";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAuthOrders,
  getOrders,
} from "../services/actions/constructor/sendGetOrder";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../utils/constants";
import { OrderIngredientsInfo } from "../components/OrderIngredientsInfo/OrderIngredientsInfo";
import {
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderInfoPage = (props) => {
  const data = useSelector((state) => state.wsReducer.data.orders);
  const ingredientsData = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const selectedOrderData = useMemo(() => {
    return props.order?.ingredients.map((id) => {
      return props.ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [props.order?.ingredients, props.ingredients]);

  const orderTotalPrice = useMemo(() => {
    return selectedOrderData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [selectedOrderData]);

  return (
    <>
      {props.order && (
        <div className={OrderInfoStyles.wrapper}>
          <div className={OrderInfoStyles.box}>
            <div className={OrderInfoStyles.orderItem}>
              <p
                className={`${OrderInfoStyles.orderNumber} text text_type_digits-default pb-10`}
              >
                #{props.order.number}
              </p>
              <p className="text text_type_main-medium pb-3">
                {props.order.name}
              </p>
              {props.order.status && (
                <p className={OrderInfoStyles.status}>
                  {props.order.status === "done"
                    ? "Выполнен"
                    : props.order.status === "pending"
                    ? "Готовится"
                    : props.order.status === "created"
                    ? "Создан"
                    : "Выполнен"}
                </p>
              )}
              <p className="text text_type_main-medium pb-6">Состав:</p>
              <ul className={`${OrderInfoStyles.ingredientsList} pr-6`}>
                <OrderIngredientsInfo data={selectedOrderData} key={id} />
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
      )}
    </>
  );
};
