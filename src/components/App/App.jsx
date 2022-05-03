import React, { useState, useEffect, useReducer } from "react";
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import BurgerConstructorContext from "../../context/burger-constructor-context";
import OrderPriceContext from "../../context/order-price-context";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import Popup from "../Popup/Popup";
import IngredientDetails from "../IngredientDetails/IngredientsDetails";
import Order from "../Order/Order";
import appStyles from "./app-styles.module.css";

const App = () => {
  const apiBurger = "https://norma.nomoreparties.space/api/";

  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [isOrderOpened, setIsOrderOpened] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  const [orderPrice, setOrderPrice] = React.useState(0);
  const [orderDetails, setOrderDetalis] = React.useState(0);

  function closePopups() {
    setIsIngredientDetailsOpened(false);
    setIsOrderOpened(false);
  }

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closePopups();
  };

  React.useEffect(() => {
    fetch(`${apiBurger}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsIngredientDetailsOpened(true);
  };

  const handleOrderClick = () => {
    setIsOrderOpened(true);
  };

  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredientsContext.Provider value={ingredients}>
          <BurgerIngredients onClickPopup={handleIngredientClick} />
        </BurgerIngredientsContext.Provider>
        <BurgerConstructorContext.Provider value={ingredients}>
          <OrderPriceContext.Provider value={{ orderPrice, setOrderPrice }}>
            <BurgerConstructor onClickPopup={handleOrderClick} orderDetails={orderDetails} setOrderDetalis={setOrderDetalis} />
          </OrderPriceContext.Provider>
        </BurgerConstructorContext.Provider>
      </main>
      {isIngredientDetailsOpened && (
        <Popup onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <IngredientDetails ingredient={currentIngredient} />
        </Popup>
      )}
      {isOrderOpened && (
        <Popup onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <Order orderNumber={orderDetails} />
        </Popup>
      )}
    </>
  );
};

export default App;
