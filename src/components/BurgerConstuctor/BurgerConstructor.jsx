import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorContainer } from "../ConstructorContainer/ConstructorContainer";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor-styles.module.css";
import { OrderPrice } from "../OrderPrice/OrderPrice";
import { Scrollbar } from "smooth-scrollbar-react";

import { sumOrder } from "../../services/actions/constructorActions";
import { getOrderNumber } from "../../utils/server";
import { deleteIngredient } from "../../services/actions/constructorActions";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOrder } from "../../services/actions/sendGetOrder";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );
  const loading = useSelector((state) => state.constructorReducer.isLoading);
  const isEmpty = useSelector((state) => state.constructorReducer.sum);
  const loggedIn = useSelector((state) => state.userReducer.userIsAuthorized);

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

  //const ingredientsIds = addedIngredients.map((ingredient) => ingredient.id);

  const ingredientsIds = addedIngredients.map((ingredient) => {
    if (ingredient._id) {
      return ingredient._id;
    } else if (ingredient.id) {
      return ingredient.id;
    }
  });

  const handleMakeOrderClick = () => {
    if (!loggedIn) {
      navigate(`/login`);
    } else {
      dispatch(getOrderNumber(ingredientsIds));
      dispatch(sendOrder(ingredientsIds));
      navigate(`/order`, {
        state: { background: location },
      });
    }
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
            disabled={addedIngredients.length === 0 ? true : false}
          >
            {loading ? "Отправляем заказ..." : "Оформить заказ"}
          </Button>
        </div>
      </section>
    </>
  );
};
