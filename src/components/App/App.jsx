import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import appStyles from "./app-styles.module.css";

function App() {
  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
