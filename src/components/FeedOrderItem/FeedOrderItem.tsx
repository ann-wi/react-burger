import FeedOrderItemStyles from "./feed-order-item-styles.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { TOrder, TIngredient } from "../../utils/types";
import { useSelector } from "../../utils/storeTypes";

export interface IFeedOrderItem {
  order: TOrder;
}

export const FeedOrderItem: FC<IFeedOrderItem> = ({ order }) => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  const orderMaxLength = order.ingredients.length;
  const ingredientsLength = orderMaxLength - 6;
  const currentDay = new Date().getDate();
  const orderDay = order.createdAt.includes(`${currentDay}`);

  const getElem = ({ data, id }: { data: TIngredient[] | []; id: string }) => {
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

  const noDuplicates = order?.ingredients.filter((item, index, items) => {
    return !items.some((i, idx) => i === item && idx > index);
  });

  return (
    order && (
      <div className={FeedOrderItemStyles.container}>
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
            {noDuplicates &&
              orderMaxLength <= 5 &&
              noDuplicates.map((item, index) => {
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
            {noDuplicates &&
              orderMaxLength >= 6 &&
              noDuplicates.slice(0, 5).map((item, index) => {
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
            {noDuplicates &&
              orderMaxLength > 6 &&
              noDuplicates.slice(5, 6).map((item, index) => {
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
