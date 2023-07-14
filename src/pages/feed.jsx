import feedStyles from "./feed-styles.css";

export const FeedPage = () => {
  return (
    <>
      <main className={feedStyles.box}>
        <div className={feedStyles.orderLayout}>
          <section>
            <h2
              className={`${feedStyles.heading} text text_type_main-large pt-10 pb-5`}
            >
              Лента заказов
            </h2>
            <ul className={feedStyles.orderBox}>
              {orders.map((order) => (
                <OrderItem key={uuidv4()} order={order} />
              ))}
            </ul>
          </section>
          <section className={`${feedStyles.orderSection} pt-25`}>
            <div className={feedStyles.statusTable}>
              <div>
                <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
                <div className={feedStyles.ordersRibbon}>
                  {doneOrders.map((doneOrder, index) => {
                    if (index < 19) {
                      return (
                        <p
                          key={uuidv4()}
                          className={`${feedStyles.orderNumber} text text_type_digits-default pb-2`}
                        >
                          {doneOrder.number}
                        </p>
                      );
                    } else if (index === 20) {
                      return (
                        <p
                          key={uuidv4()}
                          className={`${feedStyles.orderNumber} text text_type_digits-default pb-2`}
                        >
                          ...
                        </p>
                      );
                    }
                  })}
                </div>
              </div>

              <div>
                <h3 className="text text_type_main-medium pb-6">В работе:</h3>
                <div className={feedStyles.ordersRibbon}>
                  {undoneOrders.map((doneOrder, index) => {
                    if (index < 19) {
                      return (
                        <p
                          key={uuidv4()}
                          className={`text text_type_digits-default pb-2`}
                        >
                          {doneOrder.number}
                        </p>
                      );
                    } else if (index === 20) {
                      return (
                        <p
                          key={uuidv4()}
                          className={`${feedStyles.orderNumber} text text_type_digits-default pb-2`}
                        >
                          ...
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за все время:
              </h3>
              <p
                className={`${feedStyles.ordersDigits} text text_type_digits-large`}
              >
                {total}
              </p>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h3>
              <p
                className={`${feedStyles.ordersDigits} text text_type_digits-large`}
              >
                {totalToday}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
