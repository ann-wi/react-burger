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

export const HomePage = ({ openIngrPopup }) => {
  const dispatch = useDispatch();
  //const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] =
  //  useState(false);
  const [isOrderOpened, setIsOrderOpened] = useState(false);

  const currentIngredient = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );

  const [orderPrice, setOrderPrice] = useState(0);
  const orderDetails = useSelector(
    (state) => state.constructorReducer.orderNumber
  );

  function closePopups() {
    //setIsIngredientDetailsOpened(false);
    setIsOrderOpened(false);
  }

  const handleIngredientClick = (ingredient) => {
    dispatch(getIngredientDetails(ingredient));
    //setIsIngredientDetailsOpened(true);
  };

  const handleOrderClick = () => {
    setIsOrderOpened(true);
  };

  return (
    <>
      <main className={homepageStyles.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients onClickPopup={openIngrPopup} />
          <BurgerConstructor onClickPopup={handleOrderClick} />
        </DndProvider>
      </main>
      {isOrderOpened && (
        <Modal onCloseClick={closePopups}>
          <Order orderNumber={orderDetails} />
        </Modal>
      )}
    </>
  );
};

HomePage.propTypes = {
  openIngrPopup: PropTypes.func,
};
