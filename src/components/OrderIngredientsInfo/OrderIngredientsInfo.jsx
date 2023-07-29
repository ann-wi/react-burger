import OrderIngredientsInfoStyles from "./order-ingredients-info-styles.module.css";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import uuid from "react-uuid";
import { useParams } from "react-router-dom";

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

  const orderIngredient = useMemo(() => {
    return props.data?.map((elem) => {
      return ingredients?.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [props.data, ingredients]);

  return (
    <div className={OrderIngredientsInfoStyles.container}>
      {orderIngredient &&
        orderIngredient.map((item) => {
          return (
            <div key={item._id} className={OrderIngredientsInfoStyles.info}>
              <div className={OrderIngredientsInfoStyles.about}>
                <div className={OrderIngredientsInfoStyles.imageBorder}>
                  <img
                    className={OrderIngredientsInfoStyles.pic}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <p className={`text text_type_main-default`}>{item.name}</p>
              </div>
              <div className={OrderIngredientsInfoStyles.price}>
                <p className={`text text_type_digits-default`}>
                  {item.type === "bun" ? count(item) * 2 : count(item)} х{" "}
                  {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
    </div>
  );
};
