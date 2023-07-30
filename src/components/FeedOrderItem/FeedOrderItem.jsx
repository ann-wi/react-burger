import FeedOrderItemStyles from "./feed-order-item-styles.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

export const FeedOrderItem = ({ order }) => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  //const data = useSelector((state) => state.wsReducer.data.orders);

  const navigate = useNavigate();
  const location = useLocation();

  const orderMaxLength = order.ingredients.length;
  const ingredientsLength = orderMaxLength - 6;
  const currentDay = new Date().getDate();
  const orderDay = order.createdAt.includes(`${currentDay}`);

  const getElem = ({ data, id }) => {
    const [theElem] = data.filter((element) => {
      return element._id === id;
    });
    return theElem;
  };

  const orderIngredients = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const countTotalPrice = useMemo(() => {
    return orderIngredients?.reduce((sum, item) => {
      return item?.type === "bun"
        ? sum + item.price * 2
        : sum + (item ? item.price : 0);
    }, 0);
  }, [orderIngredients]);

  const clickHandler = () => {
    navigate(`/feed/${order._id}`, { background: location });
  };

  return (
    order && (
      <div className={FeedOrderItemStyles.container} onClick={clickHandler}>
        <div className={FeedOrderItemStyles.head}>
          <p className={`text text_type_digits-default`}>#{order.number}</p>
          <p className={`text text_type_main-default text_color_inactive`}>
            {orderDay ? "Сегодня" : "Вчера"}, {order.createdAt.slice(11, 16)}{" "}
            {`i-GMT+3`}
          </p>
        </div>
        <p
          className={`text text_type_main-medium ${FeedOrderItemStyles.title}`}
        >
          {order.name}
        </p>
        <p
          className={`text text_type_main-default ${FeedOrderItemStyles.status}`}
        >
          {order.status === "done"
            ? "Выполнен"
            : order.status === "pending"
            ? "Готовится"
            : order.status === "created"
            ? "Создан"
            : "Выполнен"}
        </p>
        <div className={FeedOrderItemStyles.about}>
          <ul className={FeedOrderItemStyles.ingredientsList}>
            {order.ingredients &&
              orderMaxLength <= 5 &&
              order.ingredients.map((item, index) => {
                return (
                  <li className={FeedOrderItemStyles.listItem} key={index}>
                    {item && (
                      <div className={FeedOrderItemStyles.imageBorder}>
                        <div className={FeedOrderItemStyles.image}>
                          <img
                            className={FeedOrderItemStyles.pic}
                            src={getElem({ data: ingredients, id: item }).image}
                            alt={getElem({ data: ingredients, id: item }).name}
                          />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            {order.ingredients &&
              orderMaxLength >= 6 &&
              order.ingredients.slice(0, 5).map((item, index) => {
                return (
                  <li className={FeedOrderItemStyles.listItem} key={index}>
                    {item && (
                      <div className={FeedOrderItemStyles.imageBorder}>
                        <div className={FeedOrderItemStyles.image}>
                          <img
                            className={FeedOrderItemStyles.pic}
                            src={getElem({ data: ingredients, id: item }).image}
                            alt={getElem({ data: ingredients, id: item }).name}
                          />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            {order.ingredients &&
              orderMaxLength > 6 &&
              order.ingredients.slice(5, 6).map((item, index) => {
                return (
                  <li className={FeedOrderItemStyles.listItem} key={index}>
                    {item && (
                      <>
                        <p
                          className={`text text_type_main-default ${FeedOrderItemStyles.disabledCount}`}
                        >{`+${ingredientsLength}`}</p>
                        <div className={FeedOrderItemStyles.disabledImage}>
                          <div className={FeedOrderItemStyles.imageBorder}>
                            <div className={FeedOrderItemStyles.image}>
                              <img
                                className={FeedOrderItemStyles.pic}
                                src={
                                  getElem({ data: ingredients, id: item }).image
                                }
                                alt={
                                  getElem({ data: ingredients, id: item }).name
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
          </ul>
          <div className={FeedOrderItemStyles.price}>
            <p
              className={`text text_type_digits-default ${FeedOrderItemStyles.priceScore}`}
            >
              {countTotalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  );
};

//{countTotalPrice(ingredients, order.ingredients)}
