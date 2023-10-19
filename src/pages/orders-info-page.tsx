import OrderInfoStyles from "./orders-info-page-styles.module.css";

import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrderIngredientsInfo } from "../components/OrderIngredientsInfo/OrderIngredientsInfo";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderInfo } from "../services/actions/getOrderItemsInfo";
import { useDispatch, useSelector } from "../utils/storeTypes";
import { TIngredient, TOrder } from "../utils/types";

export interface IOrderInfoPage {
  isModal: boolean;
}

export const OrderInfoPage: FC<IOrderInfoPage> = ({ isModal }) => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  const order = useSelector((state) => {
    let order = state.wsReducer.data.orders?.find(
      (elem: TOrder) => String(elem.number) === number
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

  const selectedOrderData = useMemo(() => {
    return order?.ingredients.map((id: string) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return selectedOrderData?.reduce((sum: number, item: TIngredient) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [selectedOrderData]);

  useEffect(() => {
    if (!order) {
      dispatch(getOrderInfo(number!));
    }
  }, [dispatch, order, number]);

  if (!order) {
    return null;
  }

  const currentDay = new Date().getDate();
  const createdAt = order.createdAt;
  const orderDay = createdAt.includes(`${currentDay}`);

  return (
    <>
      {
        <div
          className={
            isModal ? OrderInfoStyles.isModal : OrderInfoStyles.wrapper
          }
        >
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
                <OrderIngredientsInfo data={selectedOrderData} key={number} />
              </ul>
              <div className={OrderInfoStyles.descriptionTotal}>
                <p className="text text_type_main-default text_color_inactive">
                  {orderDay ? "Сегодня" : "Вчера"}, {createdAt.slice(11, 16)}{" "}
                  {`i-GMT+3`}
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
        </div>
      }
    </>
  );
};
