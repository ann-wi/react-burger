import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import homepageStyles from "./homepage-styles.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstuctor/BurgerConstructor";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import Order from "../components/Order/Order";
import Modal from "../components/Modal/Modal";
import PropTypes from "prop-types";

import { getIngredientDetails } from "../services/actions/constructor/ingredientDetails";
import { getIngredients } from "../services/actions/constructor/server-actions-constructor";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.userReducer.userIsAuthorized);

  const currentIngredient = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );

  const orderDetails = useSelector(
    (state) => state.constructorReducer.orderNumber
  );

  return (
    <>
      <main className={homepageStyles.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
};
