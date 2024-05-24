# Проект Stellar Burger 

Сайт космической бургерной, на которой можно собрать бургер из ингредиентов и сделать заказ.

![project-presentation](https://github.com/ann-wi/react-burger/blob/main/src/assets/project-presentation.png?raw=true)


# Функциональность:
- главная страница (перетаскивание ингредиентов в конструктор, внутри конструктора, оформление заказа);
- регистрация, авторизация, восстановление пароля, выход из профиля;
- изменение данных профиля;
- просмотр ленты всех и своих заказов;
- модальные окна (один ингредиент, номер заказа, детали заказа).

# Технологии:
- Для написания проекта использовалась библиотека React;
- HTML и CSS;
- Redux для создания единого хранилища и управления состоянием приложения;
- react-router-dom использован для роутинга;
- react-dnd применяется для перетаскивания ингредиентов и формирования полноценного бургера для заказа;
- TypeScript - для типизации кода приложения;
- Jest, Cypress - тестирование приложения;
- Websocket - обеспечивает непрерывный поток данных заказов с бэкенда, который позволяет получать заказы и просматривать их статусы в режиме реального времени;
- accessToken и refreshToken. При регистрации и входе выдаются оба токена. accessToken служит для автоматического входа в приложение при перезагрузке страницы. refreshToken служит для обновления предыдущего в случае если он истек.

# Демонстрация проекта на GitHub Pages:
[https://ann-wi.github.io/](https://ann-wi.github.io/react-burger/)