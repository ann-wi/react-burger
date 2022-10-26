import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderPriceContext from "../../context/order-price-context";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor-styles.module.css";
import OrderPrice from "../OrderPrice/OrderPrice";
import { Scrollbar } from "smooth-scrollbar-react";
import PropTypes from "prop-types";

import { getOrderNumber } from "../../services/actions/server-actions";

// Drag Target
const BurgerConstructor = ({ ingredients, onClickPopup }) => {
  const dispatch = useDispatch();

  const { setOrderPrice } = useContext(OrderPriceContext);

  React.useEffect(() => {
    let total = 0;
    ingredients.map((item) => (total += item.price));
    setOrderPrice(total);
  }, [ingredients, setOrderPrice]);

  const ingredientsIds = ingredients.map((ingredient) => ingredient._id);

  const handleMakeOrderClick = () => {
    dispatch(getOrderNumber(ingredientsIds));
  };

  return (
    <>
      <section className={`${constructorStyles.constr} pt-25`}>
        <div className={`${constructorStyles.elementBun} mb-4 mr-4`}>
          {ingredients
            .filter(
              (ingredient) => ingredient.name === "Краторная булка N-200i"
            )
            .map((ingredient) => (
              <ConstructorElement
                key={ingredient._id}
                type="top"
                isLocked={true}
                text={`${ingredient.name} (верх)`}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            ))}
        </div>
        <div className={constructorStyles.elements}>
          <Scrollbar damping={0.07}>
            {ingredients
              .filter((ingredient) => ingredient.type !== "bun")
              .map((ingredient) => (
                <div
                  key={ingredient._id}
                  className={`${constructorStyles.element} mb-4`}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </div>
              ))}
          </Scrollbar>
        </div>
        <div className={`${constructorStyles.elementBun} mt-4 mr-4`}>
          {ingredients
            .filter(
              (ingredient) => ingredient.name === "Краторная булка N-200i"
            )
            .map((ingredient) => (
              <ConstructorElement
                key={ingredient._id}
                type="bottom"
                isLocked={true}
                text={`${ingredient.name} (низ)`}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            ))}
        </div>
        <div className={`${constructorStyles.order} mt-10`}>
          <div className={constructorStyles.orderNum}>
            <OrderPrice />
            <CurrencyIcon type="primary"></CurrencyIcon>
          </div>
          <button
            onClick={() => {
              handleMakeOrderClick();
              onClickPopup();
            }}
            className={`${constructorStyles.button} ml-10`}
          >
            <p
              className={`${constructorStyles.buttonText} text text_type_main-default`}
            >
              Оформить заказ
            </p>
          </button>
        </div>
      </section>
    </>
  );
};

BurgerConstructor.propTypes = {
  onClickPopup: PropTypes.func,
  setOrderDetalis: PropTypes.func,
};

export default BurgerConstructor;
