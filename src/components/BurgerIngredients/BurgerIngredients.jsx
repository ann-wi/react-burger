import React from "react";
import ingedientsStyles from "./burger-ingredients-styles.module.css";
import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

const Card = ({ data }) => {
  const image = <img src={data.image} alt={data.name} />;

  return (
    <div className={ingedientsStyles.card}>
      <div className={ingedientsStyles.image}>{image}</div>
      <p className={ingedientsStyles.price}>
        {data.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={ingedientsStyles.name}>{data.name}</p>
    </div>
  );
};

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
        <section className={ingedientsStyles.products}>
          <p className={ingedientsStyles.section}>Булки</p>
          {data.map((product, index) => {
            if (product.type === "bun") {
              return <Card className={ingedientsStyles.card} key={index} data={product} />;
            }
          })}
        </section>
        <section className={ingedientsStyles.products}>
          <p className={ingedientsStyles.section}>Соусы</p>
          {data.map((product, index) => {
            if (product.type === "sauce") {
              return <Card className={ingedientsStyles.card} key={index} data={product} />;
            }
          })}
        </section>
        <section className={ingedientsStyles.products}>
          <p className={ingedientsStyles.section}>Начинки</p>
          <div className={ingedientsStyles.cards}>
            {data.map((product, index) => {
              if (product.type === "main") {
                return <Card key={index} data={product} />;
              }
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default BurgerIngredients;
