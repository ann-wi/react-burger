import OrderIngredientsInfoStyles from "./order-ingredients-info-styles.module.css";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderIngredientsInfo = (props) => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  const count = (elem) => {
    let count = props.data.filter((item) => {
      return item === elem;
    }).length;
    return count;
  };

  const orderIngredients = useMemo(() => {
    return props.data?.map((elem) => {
      return ingredients?.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [props.data, ingredients]);

  const noDuplicates = orderIngredients.filter((item, index, items) => {
    return !items.some((i, idx) => i._id === item._id && idx > index);
  });

  return (
    <div className={OrderIngredientsInfoStyles.container}>
      {noDuplicates &&
        noDuplicates.map((item, index) => {
          return (
            <li
              key={index}
              className={OrderIngredientsInfoStyles.ingredienDetail}
            >
              <div className={OrderIngredientsInfoStyles.imgContainer}>
                <img
                  className={OrderIngredientsInfoStyles.imgIngredient}
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <p className="text text_type_main-default">{item.name}</p>
              <div className={OrderIngredientsInfoStyles.countAndPrice}>
                <p
                  className={`${OrderIngredientsInfoStyles.sum} text text_type_digits-default`}
                >
                  {item.type === "bun" ? count(item) * 2 : count(item)}
                  <span className="text_type_main-small"> х </span>
                  {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
    </div>
  );
};
