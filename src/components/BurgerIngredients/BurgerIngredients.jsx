import React from "react";
import ingedientsStyles from "./burger-ingredients-styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../Card/Card";
import data from "../../utils/data";
import { Scrollbar } from "smooth-scrollbar-react";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <section className={`${ingedientsStyles.elements} pt-10 mr-10`}>
        <h1 className={`${ingedientsStyles.title} text text_type_main-medium`}>Соберите бургер</h1>
        <div className={`${ingedientsStyles.tabs} mt-5 mb-10`}>
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
        <article className={`${ingedientsStyles.products}`}>
          <Scrollbar damping={0.07}>
            <div className={ingedientsStyles.list}>
              <h3 className={`${ingedientsStyles.sectionTitle} mb-6 text text_type_main-medium`}>Булки</h3>
              <div className={ingedientsStyles.cards}>
                {data.map((product) => {
                  if (product.type === "bun") {
                    return <Card key={product._id} data={product} />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className={ingedientsStyles.list}>
              <h3 className={`${ingedientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Соусы</h3>
              <div className={ingedientsStyles.cards}>
                {data.map((product) => {
                  if (product.type === "sauce") {
                    return <Card key={product._id} data={product} />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className={ingedientsStyles.list}>
              <h3 className={`${ingedientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Начинки</h3>
              <div className={ingedientsStyles.cards}>
                {data.map((product) => {
                  if (product.type === "main") {
                    return <Card key={product._id} data={product} />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </Scrollbar>
        </article>
      </section>
    </>
  );
}

export default BurgerIngredients;
