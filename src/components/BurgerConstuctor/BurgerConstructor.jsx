import React from "react";
import { ConstructorElement, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor-styles.module.css";
import data from "../../utils/data";
import { Scrollbar } from "smooth-scrollbar-react";

function BurgerConstructor() {
  return (
    <>
      <section className={`${constructorStyles.constr} pt-25`}>
        <div className={`${constructorStyles.elementBun} mb-4 mr-4`}>
          {data.map((product) => {
            if (product.type === "bun" && product.name === "Краторная булка N-200i") {
              return <ConstructorElement key={product._id} type="top" isLocked={true} text={product.name} price={product.price} thumbnail={product.image} />;
            } else {
              return null;
            }
          })}
        </div>
        <Scrollbar damping={0.07}>
          <div className={`${constructorStyles.elements} pr-4 pl-4`}>
            {data.map((product) => {
              if (product.type !== "bun") {
                return (
                  <div className={`${constructorStyles.element} mb-4`}>
                    <DragIcon type="primary" />
                    <ConstructorElement key={product._id} text={product.name} price={product.price} thumbnail={product.image} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </Scrollbar>
        <div className={`${constructorStyles.elementBun} mt-4 mr-4`}>
          {data.map((product) => {
            if (product.type === "bun" && product.name === "Краторная булка N-200i") {
              return <ConstructorElement key={product._id} type="bottom" isLocked={true} text={product.name} price={product.price} thumbnail={product.image} />;
            } else {
              return null;
            }
          })}
        </div>
        <div className={`${constructorStyles.order} mt-10`}>
          <div className={constructorStyles.orderNum}>
            <p className={`${constructorStyles.digit} text text_type_digits-medium`}>610</p>
            <CurrencyIcon type="primary"></CurrencyIcon>
          </div>
          <button className={`${constructorStyles.button} ml-10`}>
            <p className={`${constructorStyles.buttonText} text text_type_main-default`}>Оформить заказ</p>
          </button>
        </div>
      </section>
    </>
  );
}

export default BurgerConstructor;
