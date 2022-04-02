import React from "react";
import ingedientsStyles from "./burger-ingredients-styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../Card/Card";
import data from "../../utils/data";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <section className={`${ingedientsStyles.elements} pt-10 mr-10`}>
        <h2 className={`${ingedientsStyles.title} text text_type_main-medium`}>Соберите бургер</h2>
        <div className={`${ingedientsStyles.tabs} mt-5`}>
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
        <section className={ingedientsStyles.products}>
          <p className={`${ingedientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Булки</p>
          <div className={ingedientsStyles.cards}>
            {data.map((product, index) => {
              if (product.type === "bun") {
                return <Card key={index} data={product} />;
              }
            })}
          </div>
        </section>
        <section className={ingedientsStyles.products}>
          <p className={`${ingedientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Соусы</p>
          <div className={ingedientsStyles.cards}>
            {data.map((product, index) => {
              if (product.type === "sauce") {
                return <Card key={index} data={product} />;
              }
            })}
          </div>
        </section>
        <section className={ingedientsStyles.products}>
          <p className={`${ingedientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Начинки</p>
          <div className={ingedientsStyles.cards}>
            {data.map((product) => {
              if (product.type === "main") {
                return <Card key={product._id} data={product} />;
              }
            })}
          </div>
        </section>
      </section>
    </>
  );
}

export default BurgerIngredients;
