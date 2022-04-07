import React from "react";
import ingredientsStyles from "./burger-ingredients-styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "smooth-scrollbar-react";
import Card from "../Card/Card";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients, onClickPopup }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <section className={`${ingredientsStyles.elements} pt-10 mr-10`}>
        <h1 className={`${ingredientsStyles.title} text text_type_main-medium`}>Соберите бургер</h1>
        <div className={`${ingredientsStyles.tabs} mt-5 mb-10`}>
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
        <div className={`${ingredientsStyles.products}`}>
          <Scrollbar damping={0.07}>
            <div className={ingredientsStyles.list}>
              <h3 className={`${ingredientsStyles.sectionTitle} mb-6 text text_type_main-medium`}>Булки</h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "bun")
                  .map((ingredient) => (
                    <Card onClick={() => onClickPopup(ingredient)} data={ingredient} key={ingredient._id} />
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list}>
              <h3 className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Соусы</h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "sauce")
                  .map((ingredient) => (
                    <Card data={ingredient} key={ingredient._id} />
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list}>
              <h3 className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Начинки</h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "main")
                  .map((ingredient) => (
                    <Card data={ingredient} key={ingredient._id} />
                  ))}
              </div>
            </div>
          </Scrollbar>
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
