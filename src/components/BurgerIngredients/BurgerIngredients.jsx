import React from "react";
import ingedientsStyles from "./burger-ingredients-styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <div className={ingedientsStyles.ingredients}>
        <h2 className={ingedientsStyles.title}>Соберите бургер</h2>
        <div className={ingedientsStyles.tabs}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
