import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConstructorContainer from "../ConstructorContainer/ConstructorContainer";
import OrderPriceContext from "../../context/order-price-context";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor-styles.module.css";
import OrderPrice from "../OrderPrice/OrderPrice";
import { Scrollbar } from "smooth-scrollbar-react";
import PropTypes from "prop-types";

import { deleteIngredient } from "../../services/actions/deleteIngredient";
import { getOrderNumber } from "../../services/actions/server-actions";

const BurgerConstructor = ({ onClickPopup }) => {
  const dispatch = useDispatch();
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );
  const { setOrderPrice } = useContext(OrderPriceContext);

  useEffect(() => {
    let total = 0;

    addedIngredients
      .filter((item, index, items) => {
        if (item.type === "bun") {
          return !items.some((i, idx) => i.type === item.type && idx > index);
        } else {
          return item;
        }
      })
      .map((ingredient) => {
        if (ingredient.type === "bun") {
          const multiPrice = ingredient.price * 2;
          return (total += multiPrice);
        }
        return (total += ingredient.price);
      });

    setOrderPrice(total);
  }, [addedIngredients, setOrderPrice]);

  const ingredientsIds = addedIngredients.map((ingredient) => ingredient.id);

  const handleMakeOrderClick = () => {
    dispatch(getOrderNumber(ingredientsIds));
  };

  const handleDeleteIngredient = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
  };

  return (
    <>
      <section className={`${constructorStyles.constr} pt-25`}>
        <ConstructorContainer containerType={"bun-top"} />
        <Scrollbar damping={0.07}>
          <a>
            <ConstructorContainer
              containerType={"main-sauce"}
              handleDeleteIngredient={handleDeleteIngredient}
            />
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
};

export default BurgerConstructor;
