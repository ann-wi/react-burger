import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConstructorContainer from "../ConstructorContainer/ConstructorContainer";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor-styles.module.css";
import OrderPrice from "../OrderPrice/OrderPrice";
import { Scrollbar } from "smooth-scrollbar-react";
import PropTypes from "prop-types";

import { sumOrder } from "../../services/actions/constructor/sumOrder";
import { getOrderNumber } from "../../services/actions/constructor/server-actions-constructor";
import { deleteIngredient } from "../../services/actions/constructor/deleteIngredient";
import { useLocation, useNavigate } from "react-router-dom";

const BurgerConstructor = ({ onClickPopup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

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

    const buns = addedIngredients.filter((item) => {
      if (item.type === "bun") {
        return item;
      }
    });

    if (buns.length > 1) {
      dispatch(deleteIngredient(buns[0]));
    }

    dispatch(sumOrder(total));
  }, [addedIngredients]);

  const ingredientsIds = addedIngredients.map((ingredient) => ingredient.id);

  const handleMakeOrderClick = () => {
    dispatch(getOrderNumber(ingredientsIds));
    navigate(`/order`, {
      state: { background: location },
    });
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
          <Button
            type={"primary"}
            size={"medium"}
            htmlType={"button"}
            extraClass="ml-10"
            onClick={() => {
              handleMakeOrderClick();
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

BurgerConstructor.propTypes = {
  onClickPopup: PropTypes.func,
};

export default BurgerConstructor;
