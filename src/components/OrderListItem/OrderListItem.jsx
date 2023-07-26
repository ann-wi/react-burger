import OrderListItemStyles from "./order-list-item-styles.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import uuid from "react-uuid";

export const OrderListItem = (props) => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const { createdAt, number, name, status } = props.order;
  const orderMaxLength = props.order.ingredients.length;
  const ingredientsLength = orderMaxLength - 6;
  const currentDay = new Date().getDate();
  const orderDay = createdAt.includes(`${currentDay}`);

  const orderIngredients = useMemo(() => {
    return props.order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [props.order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredients?.reduce((sum, item) => {
      return item?.type === "bun"
        ? sum + item.price * 2
        : sum + (item ? item.price : 0);
    }, 0);
  }, [orderIngredients]);

  return (
    <div className={OrderListItemStyles.container}>
      <div className={OrderListItemStyles.head}>
        <p className={`text text_type_digits-default`}>#{number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          {orderDay ? "Сегодня" : "Вчера"}, {createdAt.slice(11, 16)}{" "}
          {`i-GMT+3`}
        </p>
      </div>
      <p className={`text text_type_main-medium ${OrderListItemStyles.title}`}>
        {name}
      </p>
      <p
        className={`text text_type_main-default ${OrderListItemStyles.status}`}
      >
        {status === "done"
          ? "Выполнен"
          : status === "pending"
          ? "Готовится"
          : status === "created"
          ? "Создан"
          : "Выполнен"}
      </p>
      <div className={OrderListItemStyles.about}>
        <ul className={OrderListItemStyles.ingredientsList}>
          {orderIngredients &&
            orderMaxLength <= 5 &&
            orderIngredients.map((item) => {
              return (
                <li className={OrderListItemStyles.listItem} key={uuid()}>
                  {item && (
                    <div className={OrderListItemStyles.imageBorder}>
                      <div className={OrderListItemStyles.image}>
                        <img
                          className={OrderListItemStyles.pic}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          {orderIngredients &&
            orderMaxLength >= 6 &&
            orderIngredients.slice(0, 5).map((item) => {
              return (
                <li className={OrderListItemStyles.listItem} key={uuid()}>
                  {item && (
                    <div className={OrderListItemStyles.imageBorder}>
                      <div className={OrderListItemStyles.image}>
                        <img
                          className={OrderListItemStyles.pic}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          {orderIngredients &&
            orderMaxLength > 6 &&
            orderIngredients.slice(5, 6).map((item) => {
              return (
                <li className={OrderListItemStyles.listItem} key={uuid()}>
                  {item && (
                    <>
                      <p
                        className={`text text_type_main-default ${OrderListItemStyles.disabledCount}`}
                      >{`+${ingredientsLength}`}</p>
                      <div className={OrderListItemStyles.disabledImage}>
                        <div className={OrderListItemStyles.imageBorder}>
                          <div className={OrderListItemStyles.image}>
                            <img
                              className={OrderListItemStyles.pic}
                              src={item.image}
                              alt={item.name}
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
        <div className={OrderListItemStyles.price}>
          <p
            className={`text text_type_digits-default ${OrderListItemStyles.priceScore}`}
          >
            {orderTotalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
