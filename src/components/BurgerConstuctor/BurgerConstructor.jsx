import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor-styles.module.css";
import data from "../../utils/data";

function BurgerConstructor() {
  return (
    <>
      <section className={constructorStyles.elements}>
        <div className={constructorStyles.elementBun}>
          {data.map((product, index) => {
            if (product.type === "bun") {
              return <ConstructorElement key={index} type="top" isLocked={true} text={product.name} price={product.price} thumbnail={product.image} />;
            }
          })}
        </div>
        {data.map((product, index) => {
          if (product.type !== "bun") {
            return (
              <div className={constructorStyles.element}>
                <DragIcon type="primary" />
                <ConstructorElement key={index} text={product.name} price={product.price} thumbnail={product.image} />
              </div>
            );
          }
        })}
        <div className={constructorStyles.elementBun}>
          {data.map((product, index) => {
            if (product.type === "bun") {
              return <ConstructorElement key={index} type="bottom" isLocked={true} text={product.name} price={product.price} thumbnail={product.image} />;
            }
          })}
        </div>
      </section>
    </>
  );
}

export default BurgerConstructor;
