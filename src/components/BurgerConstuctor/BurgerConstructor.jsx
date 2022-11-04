import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorContainer from "../App/ConstructorContainer/ConstructorContainer";
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
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );
  const { setOrderPrice } = useContext(OrderPriceContext);

  React.useEffect(() => {
    let total = 0;
    addedIngredients.map((item) => (total += item.price));
    setOrderPrice(total);
  }, [addedIngredients, setOrderPrice]);

  const ingredientsIds = addedIngredients.map((ingredient) => ingredient.id);

  const handleMakeOrderClick = () => {
    dispatch(getOrderNumber(ingredientsIds));
  };

  return (
    <>
      <section className={`${constructorStyles.constr} pt-25`}>
        <ConstructorContainer containerType={"bun-top"} />
        <Scrollbar damping={0.07}>
          <a>
            <ConstructorContainer containerType={"main-sauce"} />
          </a>
        </Scrollbar>
        <ConstructorContainer containerType={"bun-bottom"} />
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
